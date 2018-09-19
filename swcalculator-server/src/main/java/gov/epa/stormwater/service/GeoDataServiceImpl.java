/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.soil.SoilMapPolygonModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.soil.SoilModel;
import gov.epa.stormwater.model.met.EvapStationLocationModel;
import gov.epa.stormwater.model.met.MetStationModel;
import gov.epa.stormwater.model.met.PrecStationLocationModel;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.mutable.MutableInt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Service;
import gov.epa.stormwater.service.email.EmailNotificationService;
import gov.epa.stormwater.service.email.NotificationException;

/**
 *
 * @author UYEN.TRAN
 */
@Service("geoDataService")
public class GeoDataServiceImpl implements GeoDataService {

    private static Logger logger = LoggerFactory
            .getLogger(GeoDataServiceImpl.class);

    private static final String PREC_FILE_NAME = "D4EMLite_PREC_Details.txt";
    private static final String EVAP_FILE_NAME = "D4EMLite_PMET_Details.txt";

    public static final int MAX_COORD_COUNT = 1000;
    public static final double SOILS_RADIUS_INCREMEMNT = 1000.0;  // meters
    public static final String[] SOIL_GROUPS = {"A", "B", "C", "D"};
    public static final int MAX_MET_STATIONS = 5;

    private static List<PrecStationLocationModel> precStationLocations;
    private static List<EvapStationLocationModel> evapStationLocations;

    @Autowired
    SsurgoService sSurgoService;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Override
    public List<SoilMapPolygonModel> getSoilData(double lat, double lng, Integer aDistance) throws SWCException {

        // Initialize soil data        
        List<SoilMapPolygonModel> output = new ArrayList<SoilMapPolygonModel>();

        SoilMapPolygonModel soilPoly = new SoilMapPolygonModel();
        SoilModel soil = new SoilModel();
        List<SoilModel> soils = null;

        // Establish a search radius around the site's lat/long
        double soilsSearchRadius = SOILS_RADIUS_INCREMEMNT;    //SoilsRadiusIncrement;
        double soilsMaxRadius = 5 * SOILS_RADIUS_INCREMEMNT;  //SoilsRadiusIncrement;

        //Validate aDistance
        if (aDistance !=null && aDistance != 0) {
        	if (aDistance != 1000 && aDistance != 2000 && aDistance != 3000 && aDistance != 4000 && aDistance !=5000) {
        		logger.warn("GeoDataService.getSoilData(): invalid search radius of " + aDistance);
        		throw new SWCException("Invalid search radius of " + aDistance + ".  Valid values are 1000, 2000, 3000, 4000, 5000");
        	}
        }
        
        // Keep searching the USDA-NRCS's SSURGO DataMart web service within an expanding radius
        //for (;;) {    //C# infinite loop
        //while (true) {
            try {
                // Get soil data within current radius
                soils = sSurgoService.findSoils(lat, lng, aDistance);

            } catch (Exception e) {
                /*
                MessageBox.Show("Could not access the SSURGO soils data base.\n"
                        + "The service may be unavailable.", "Soils Data Search",
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                 */
                logger.error("GeoDataService.getSoilData(): " + e.getMessage());
                throw new SWCException("Could not access the SSURGO soils data base.  The service may be unavailable. " + e.getMessage());
            }

            // Data was found
            if (soils != null && !soils.isEmpty()) {
                // Transfer polygons with soil data retrieved from web service to MapPolygon objects
                MutableInt polyCount = new MutableInt(0);   //Java does not allow pass by reference so have to use wrapper class

                for (int i = 0; i < soils.size(); i++) {
                    output.add(transferSoilPolygon(soils.get(i), polyCount));
                }

                if (polyCount.intValue() > 0) {
                    //return true;

                    return output;
                }
            }

            // No data found -- return empty array and front end ask user to increase the search radius
            if (soilsSearchRadius < soilsMaxRadius) {               
                String msg = "No soils data were found within a radius of "
                        + soilsSearchRadius + " meters.";
                logger.warn("GeoDataService.getSoilData(): " + msg);
                return output;
                /*
                if (MessageBox.Show(msg, "Soils Data Search", MessageBoxButtons.YesNo,
                        MessageBoxIcon.Question) == System.Windows.Forms.DialogResult.No) {
                }
                 */
                //This is if user expands search radious: soilsSearchRadius += SOILS_RADIUS_INCREMEMNT;
            } // Max. search radius reached
            else {
                /*
                MessageBox.Show("No soils data were found for this site.", "Soils Data Search",
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                 */
                String msg = "No soils data were found for this site";
                logger.error("GeoDataService.getSoilData(): " + msg);
                throw new SWCException(msg);

            }
        //}
    }

    // Made private b/c did not see used in any other clases
    private SoilMapPolygonModel transferSoilPolygon(SoilModel soil, MutableInt polyCount) {

        SoilMapPolygonModel soilPoly = new SoilMapPolygonModel();

        // Analyze each polygon in the retrieved soil data set                
        for (int j = 0; j < soil.getPolygons().size(); j++) {
            // skip inner polygons and ones with no soil group
            if (!soil.getPolygons().get(j).getOuter() || soil.getHSG() == null
                    || soil.getHSG().length() == 0 || soil.getKSAT_Surface() < 0) {
                return soilPoly;
            }

            soilPoly.setPolygons(soil.getPolygons());

            /* NOT NECESSARY
                
            // find skip rate for polygon vertices            
             int coordCount = soil.getPolygons().get(j).getCoord().size();
            int skipCount = coordCount / MAX_COORD_COUNT + 1;
            int reducedCoordCount = coordCount / skipCount;
            
            // transfer vertices from soil.Polygon to a MapPolygon
            SoilMapPolygonModel p = new SoilMapPolygonModel();
            //p.lat = new double[reducedCoordCount];
            //p.lng = new double[reducedCoordCount];
            Double[] pLat = new Double[reducedCoordCount];
            Double[] pLng = new Double[reducedCoordCount];
            int k = 0;
            int m = 0;
            while (k < coordCount && m < reducedCoordCount) {
                //p.lat[m] = soil.Polygons[j].Coord[k].Lat;
                pLat[m] = soil.getPolygons().get(j).getCoord().get(k).getLatitude();
                //p.lng[m] = soil.Polygons[j].Coord[k].Lng;
                pLng[m] = soil.getPolygons().get(j).getCoord().get(k).getLongitude();
                m += 1;
                k += skipCount;
            }

            p.setLat(pLat);
            p.setLng(pLng);
             */
            // save first character of HSG string to MapPolygon object
            soilPoly.setSoilGroup(soil.getHSG().substring(0, 1));

            // convert KSAT from micrometers/sec to in/hr
            soilPoly.setKSat(soil.getKSAT_Surface() * 0.012);

            // save slope value and soil polygon
            soilPoly.setSlope(soil.getSlope_R());

            // add the new MapPolygon to the collection of map soil polygons
            //soilPolygons.Add(p);
            //soilPoly.getSoilPolygons().add(p);            
            polyCount.increment();
        }

        return soilPoly;

    }

    @Override
    public MetStationModel getMetStations(double lat, double lng) throws SWCException {

        MetStationModel output = new MetStationModel();

        //Get closeset 5
        output.setPrecStations(getPrecipClosest(lat, lng, MAX_MET_STATIONS));
        output.setEvapStations(getEvapClosest(lat, lng, MAX_MET_STATIONS));

        return output;
    }

    /*
     ***********************************************************************************************************
     * This section of code replaces need for SWC_D4EMLite
    /***********************************************************************************************************/
    @Override
    public List<PrecStationLocationModel> getPrecLocations() throws SWCException {

        PrecStationLocationModel prec = new PrecStationLocationModel();

        //Only load if not already loaded
        if (precStationLocations == null) { //) && precStationLocations.isEmpty()) {
            precStationLocations = new ArrayList<PrecStationLocationModel>();
            //Read file and load into model
            String str = Utils.readFile(PREC_FILE_NAME);
            String line = null;

            //Reach each line and split out values into Array
            //String[] values = str.split("\\s+");    //delimited by space
            try {
                BufferedReader bufReader = new BufferedReader(new StringReader(str));
                while ((line = bufReader.readLine()) != null) {
                    String[] values = line.split("\\t");   //tab separated should be 13 items, start with array 0
                    //skip first line which has headers
                    if (line.startsWith("Station")) {
                        continue;
                    }
                    //Copy values to model
                    precStationLocations.add(new PrecStationLocationModel(values[0], values[1], values[2].replace(".wdm", ".dat"), Integer.parseInt(values[3]), Double.parseDouble(values[4]), new Double(values[5]), values[6], values[7], values[8].replace("'", ""), values[9].replace("'", ""), Double.parseDouble(values[10]), Double.parseDouble(values[11]), values[12]));
                }
            } catch (Exception ex) {
                logger.error("GeoDataServiceImpl.getPrecLocations error: " + ex.getMessage());
                throw new SWCException(ex.getMessage());
            }
        }
        return precStationLocations;

    }

    @Override
    public List<EvapStationLocationModel> getEvapLocations() throws SWCException {

        EvapStationLocationModel evap = new EvapStationLocationModel();

        //Only load if not already loaded
        if (evapStationLocations == null) { 
            evapStationLocations = new ArrayList<EvapStationLocationModel>();
            //Read file and load into model
            String str = Utils.readFile(EVAP_FILE_NAME);
            String line = null;

            //Reach each line and split out values into Array
            try {
                BufferedReader bufReader = new BufferedReader(new StringReader(str));
                while ((line = bufReader.readLine()) != null) {
                    String[] values = line.split("\\t");   //tab separated should be 26 items, start with array 0
                    //skip first line which has headers
                    if (line.startsWith("Station")) {
                        continue;
                    }
                    //Copy values to model
                    evapStationLocations.add(new EvapStationLocationModel(values[0], values[1], values[2].replace(".wdm", ".dat"), Integer.parseInt(values[3]), Double.parseDouble(values[4]), new Double(values[5]), values[6], values[7], values[8].replace("'", ""), values[9].replace("'", ""), Double.parseDouble(values[10]), Double.parseDouble(values[11]),
                            Double.parseDouble(values[12]), Double.parseDouble(values[13]), Double.parseDouble(values[14]), Double.parseDouble(values[15]), Double.parseDouble(values[16]), Double.parseDouble(values[17]), Double.parseDouble(values[18]), Double.parseDouble(values[19]), Double.parseDouble(values[20]),
                            Double.parseDouble(values[21]), Double.parseDouble(values[22]), Double.parseDouble(values[23]), Double.parseDouble(values[24]), values[25]));
                }
            } catch (Exception ex) {
                logger.error("GeoDataServiceImpl.getEvapLocations error: " + ex.getMessage());
                throw new SWCException(ex.getMessage());
            }
        }

        return evapStationLocations;

    }

    @Override
    public List<PrecStationLocationModel> getPrecipClosest(Double aLatitude, Double aLongitude, Integer aMaxCount) throws SWCException {
 
        List<PrecStationLocationModel> output = new ArrayList<PrecStationLocationModel>();
        Map<Double, PrecStationLocationModel> mapPrec = new HashMap<Double, PrecStationLocationModel>();

        //Get all precip locations (won't reload if already loaded)
        List<PrecStationLocationModel> allPrecStationLocations = getPrecLocations();

        for (PrecStationLocationModel precStation : allPrecStationLocations) {
            Double key = greatCircleDistance(aLongitude, aLatitude, precStation.getLongitude(), precStation.getLat());
            while (mapPrec.containsKey(key)) {
                key *= 1.00000001;
            }
            mapPrec.put(key, precStation);
        }

        //Sort by key (distance) - NOTE: treemap can only sort keys, not values
        Map<Double, PrecStationLocationModel> treeMap = new TreeMap<Double, PrecStationLocationModel>(mapPrec);

        //Create short list to return just top 5        
        int i = 0;
        for (Map.Entry<Double, PrecStationLocationModel> entry : treeMap.entrySet()) {
            //for (int i = 1; i == MAX_MET_STATIONS; i++) {
            if (i < MAX_MET_STATIONS) {
                output.add(entry.getValue());
                i += 1;
            }
        }

        return output;
    }

    @Override
    public List<EvapStationLocationModel> getEvapClosest(Double aLatitude, Double aLongitude, Integer aMaxCount) throws SWCException {
 
        List<EvapStationLocationModel> output = new ArrayList<EvapStationLocationModel>();
        Map<Double, EvapStationLocationModel> mapEvap = new HashMap<Double, EvapStationLocationModel>();

        //Get all evap locations
        List<EvapStationLocationModel> allEvapStationLocations = getEvapLocations();

        for (EvapStationLocationModel evapStation : allEvapStationLocations) {
            Double key = greatCircleDistance(aLongitude, aLatitude, evapStation.getLongitude(), evapStation.getLat());
            while (mapEvap.containsKey(key)) {
                key *= 1.00000001;
            }
            mapEvap.put(key, evapStation);
        }

        //Sort by distance
        Map<Double, EvapStationLocationModel> treeMap = new TreeMap<Double, EvapStationLocationModel>(mapEvap);

        //Create short list to return just top 5        
        int i = 0;
        for (Map.Entry<Double, EvapStationLocationModel> entry : treeMap.entrySet()) {
            //for (int i = 1; i == MAX_MET_STATIONS; i++) {
            if (i < MAX_MET_STATIONS) {
                output.add(entry.getValue());
                i += 1;
            }
        }
        return output;
    }

    @Override
    public Double greatCircleDistance(Double aLong1, Double aLat1, Double aLong2, Double aLat2) {
        Double d1 = Math.PI / 180.0 * aLat1;
        Double d2 = Math.PI / 180.0 * aLat2;
        Double num1 = Math.PI / 180.0 * aLong1;
        Double num2 = Math.PI / 180.0 * aLong2;

        return 2.0 * Math.asin(Math.sqrt(Math.pow(Math.sin((d1 - d2) / 2.0), 2.0) + Math.cos(d1) * Math.cos(d2) * Math.pow(Math.sin((num1 - num2) / 2.0), 2.0))) * 6366.71 * 1000.0;

    }

    @Override
    public EvapStationLocationModel getEvapData(String evapStationID, Boolean dailyFlag)
            throws SWCException {

        EvapStationLocationModel output = new EvapStationLocationModel();
        /*        
        s = ((EvapStationLocation) evapStationsClosest.Values[evapSourceIndex]).GetData(
                Download.TimeseriesFormat.SWMM_Monthly_Average);
         */
        List<EvapStationLocationModel> evapStations = getEvapLocations();

        for (EvapStationLocationModel p : evapStations) {
            if (p.getStationId().equalsIgnoreCase(evapStationID)) {
                return p;
            }
        }

        return output;
    }

    @Override
    public List<Double> getEvapDataTimeSeriesFormat(String evapStationID, Boolean dailyFlag)
            throws SWCException {

        System.out.println("#### GeoDataServiceImpl.getEvapDataTimeSeriesFormat");
//        System.out.println("evapStationID = [" + evapStationID + "], dailyFlag = [" + dailyFlag + "]");

        List<Double> output = new ArrayList<Double>();

        EvapStationLocationModel evapModel = getEvapData(evapStationID, Boolean.FALSE);
        double aMultFactor = 1.0;

        //Put values for months into string array
        Double[] values = new Double[12];
        values[0] = evapModel.getJan();
        values[1] = evapModel.getFeb();
        values[2] = evapModel.getMar();
        values[3] = evapModel.getApr();
        values[4] = evapModel.getMay();
        values[5] = evapModel.getJun();
        values[6] = evapModel.getJul();
        values[7] = evapModel.getAug();
        values[8] = evapModel.getSep();
        values[9] = evapModel.getOct();
        values[10] = evapModel.getNov();
        values[11] = evapModel.getDec();

//        System.out.println("values = " + values.toString());

        for (int i = 0; i < 12; i++) {
//            System.out.println("for: i = " + i);

//            System.out.println(aMultFactor +" * "+ values[i] +" = "+ aMultFactor * values[i]);

            double d = new BigDecimal(aMultFactor * values[i]).setScale(2, RoundingMode.UP).doubleValue();

            //stringBuilder.Append(modString.DoubleToString(aMultFactor * Conversions.ToDouble(strArray[index]), 6, "##0.00", (string) null, "#", 5) + " ");
//            output.add(Double.parseDouble(new DecimalFormat("#0.00").format(aMultFactor * values[i])));
//            System.out.println("add value: "+d +" to list");
            output.add(d);
        }

//        System.out.println("output = " + output);

        return output;

    }

    /*
     ***********************************************************************************************************
     * END - This section of code replaces need for SWC_D4EMLite
    /***********************************************************************************************************/

 /* 
     * Return string with path and name of rainfall file based on rainStationID
     */
    @Override
    public String getRainfallDataFile(String rainStationID) throws SWCException {

        List<PrecStationLocationModel> precStations = getPrecLocations();

        for (PrecStationLocationModel p : precStations) {
            if (p.getStationId().equalsIgnoreCase(rainStationID)) {
                return p.getFileName();
            }
        }
        return null;

    }

    @Override
    public void setStartEndYearsPrecip(SiteData siteData) throws SWCException {

        List<PrecStationLocationModel> precStations = getPrecLocations();
        boolean found = false;
        for (PrecStationLocationModel p : precStations) {
            if (p.getStationId().equalsIgnoreCase(siteData.getPrecStationID())) {
                siteData.setStartYear(Integer.parseInt(p.getSDate().substring(0, 4)));
                siteData.setEndYear(Integer.parseInt(p.getEDate().substring(0, 4)));
                found = true;
            }
        }

        if (!found) {
            logger.equals("geoDataService.setStartEndYearsPrecip: Error finding data for precip station ID - " + siteData.getPrecStationID());
            throw new SWCException("Unable to find data for precipitation station ID " + siteData.getPrecStationID());
        }
    }

    /* Returns data (byte[]) for a precip Station based on Station ID. */
    @Override
    public byte[] downloadRainfallData(String rainStationID) throws SWCException {

        byte[] output = null;

        //Get name of file
        String rainFile = null;
        String rainFilePath = null;

        rainFile = getRainfallDataFile(rainStationID);
        if (rainFile == null) {
            String s = "No rainfile data found for station ID: " + rainStationID;
            output = s.getBytes();
            return output;
        }

        rainFilePath = Constants.FILE_PATH_SWC_DATA + getRainfallDataFile(rainStationID);
        //Read file
        try {

            InputStream inputStream = new FileInputStream(new File(rainFilePath));            
            output = IOUtils.toByteArray(inputStream);
            inputStream.close();
        } catch (FileNotFoundException e) {
            logger.error("GeoDataServiceImpl.generateRainfallData: " + e.getMessage());
            throw new SWCException(e.getMessage());
        } catch (IOException ie) {
            logger.error("GeoDataServiceImpl.generateRainfallData: " + ie.getMessage());
            throw new SWCException(ie.getMessage());
        }

        return output;

    }

    /* Returns data (byte[]) for a precip Station based on Station ID. */
    @Override
    public byte[] downloadEvapData(String evapStationID) throws SWCException {

        byte[] output = null;

        String sOut = null;
        List<Double> data = null;

        data = getEvapDataTimeSeriesFormat(evapStationID, false);

        if (data == null) {
            sOut = "No evap data found for station ID: " + evapStationID;
            output = sOut.getBytes();
            return output;
        }

        sOut = "";
        for (Double d : data) {
            sOut = sOut + d.toString() + " ";
        }

        output = sOut.getBytes();
        return output;

    }

    @Override
    public void emailRainfallData(String rainStationID, String emailTo) throws SWCException, NotificationException {

        InputStreamSource file = new ByteArrayResource(downloadRainfallData(rainStationID));
        emailNotificationService.sendMailAttachment(emailTo, Constants.EMAIL_SUBJ_RAINFALL, Constants.EMAIL_BODY_DATA, "Rain - " + rainStationID + ".dat", file);

    }

    @Override
    public void emailEvapData(String evapStationID, String emailTo, String staNam) throws SWCException, NotificationException {

        InputStreamSource file = new ByteArrayResource(downloadEvapData(evapStationID));
        String sFileName = "Evap - ";
        if (staNam != null && staNam.trim() != "") {
            sFileName = sFileName + staNam;
        } else {
            sFileName = sFileName + evapStationID;
        }
        sFileName = sFileName + ".dat";
        emailNotificationService.sendMailAttachment(emailTo, Constants.EMAIL_SUBJ_EVAP, Constants.EMAIL_BODY_DATA,  sFileName, file);

    }

}
