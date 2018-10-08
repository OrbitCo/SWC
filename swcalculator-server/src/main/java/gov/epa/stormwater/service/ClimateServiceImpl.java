/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.ClimateModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author UYEN.TRAN
 * 
 *  Notes from Desktop code:
   This module accesses tables of rainfall and evaporation adjustments
   that are compiled as Resources within the project. These tables are
   named as follows:

   PRECyyyyxxx - climate change adjustments to monthly average rainfall
                 for each precip. station where yyyy is either 2035 or
                 2060 and xxx can be either Hot, Med, or Dry.

   PMETyyyyxxx - climate adjusted daily evaporation rates (by month of
                 year) for each evap. station where yyyy is either 2035
                 or 2060 and xxx can be either Hot, Med, or Dry.

   GEVdepthyyyyxxx - climate change extreme event 24-hour rainfall depths
                     for six different return periods for each precip.
                     station where yyyy is either 2035 or 2060 and xxx can
                     be either Hot, Med, or Dry.

   GEVdepth_historical - extreme event 24-hour rainfall depths for six 
                         different return periods at each precip. station
                         for the historical rainfall record.
 */
@Service("climateService")
public class ClimateServiceImpl implements ClimateService {

    private static Logger logger = LoggerFactory
            .getLogger(ClimateServiceImpl.class);

    @Autowired
    GeoDataService geoDataService;

    // Updates the climate change adjustments displayed on the MainForm's
    // Climate Change page when a new precip. station or climate projection
    // year is selected.
    @Override
    public void updateAdjustments(SiteData siteData) throws SWCException {

        updateRainfallAdjustments(siteData.getClimateYear(), siteData.getPrecStationID(), siteData.getClimateModel());
        updateMaxRainAdjustments(siteData.getClimateYear(), siteData.getPrecStationID(), siteData.getClimateModel());

    }

    // Finds adjustments to monthly average rainfall depths for a choice of
    // precip. station location and climate projection year.
    private void updateRainfallAdjustments(int climateYear, String rainStationID, ClimateModel climateModel) throws SWCException {
        // Get rainfall adjustments for each scenario
        //To be passed in from the UI - GeoData.GetStationID(SiteData.rainSourceIndex);

        String precTableHot;
        String precTableMed;
        String precTableWet;

        if (climateYear == 2035) {
            precTableHot = Utils.readFile(Constants.PREC2035HOT);
            precTableMed = Utils.readFile(Constants.PREC2035MED);
            precTableWet = Utils.readFile(Constants.PREC2035WET);
            // precTable = StormwaterCalculator.Properties.Resources.PREC2035Hot;
        } else {
            precTableHot = Utils.readFile(Constants.PREC2060HOT);
            precTableMed = Utils.readFile(Constants.PREC2060MED);
            precTableWet = Utils.readFile(Constants.PREC2060WET);
            // precTable = StormwaterCalculator.Properties.Resources.PREC2060Hot;
        }

        climateModel.setRainDelta1(getRainfallAdjustments(precTableHot, rainStationID));
        climateModel.setRainDelta2(getRainfallAdjustments(precTableMed, rainStationID));
        climateModel.setRainDelta3(getRainfallAdjustments(precTableWet, rainStationID));

    }

    // Finds extreme event rainfall depths for a choice of precip. station and
    // climate projection year.
    private void updateMaxRainAdjustments(int climateYear, String rainStationID, ClimateModel climateModel) throws SWCException {

        String precTableHot;
        String precTableMed;
        String precTableWet;
        String precTableHistorical;

        //rainDeltaHot - PointPairList from Data for ZedGraph zgcMonthlyAdjust on MainForm
        if (climateYear == 2035) {
            precTableHot = Utils.readFile(Constants.GEVDEPTH2035HOT);
            precTableMed = Utils.readFile(Constants.GEVDEPTH2035MED);
            precTableWet = Utils.readFile(Constants.GEVDEPTH2035WET);
        } else {
            precTableHot = Utils.readFile(Constants.GEVDEPTH2060HOT);
            precTableMed = Utils.readFile(Constants.GEVDEPTH2060MED);
            precTableWet = Utils.readFile(Constants.GEVDEPTH2060WET);
        }
        precTableHistorical = Utils.readFile(Constants.GEVDEPTH_HISTORICAL);

        climateModel.setMaxRain1(getMaxRainAdjustments(precTableHot, rainStationID));
        climateModel.setMaxRain2(getMaxRainAdjustments(precTableMed, rainStationID));
        climateModel.setMaxRain3(getMaxRainAdjustments(precTableWet, rainStationID));
        climateModel.setmaxRainHistorical(getMaxRainAdjustments(precTableHistorical, rainStationID));

    }

    // Retrieves the adjustments to monthly average rainfall for
    // a specific precip. station and climate change table.
    private List<Double> getRainfallAdjustments(String precTable, String rainStationID) throws SWCException {
        
        String line = null;
        List<Double> output = new ArrayList<Double>();

        try {
            BufferedReader bufReader = new BufferedReader(new StringReader(precTable));
            while ((line = bufReader.readLine()) != null) {
                if (line == null) {
                    return output;
                }
                if (line.startsWith(rainStationID)) {                    
                    String[] values = line.split("\\s+");
                    if (values.length >= 13) {//Copy split out values to the array, excluding i=0 which is the rainID    
                        for (int i = 1; i <= 12; i++) {
                            output.add(Double.parseDouble(values[i]));
                        }
                    }
                    return output;
                }
            }
        } catch (Exception ex) {
            logger.error("ClimateServiceImpl.getRainfallAdjustments error: " + ex.getMessage());
            throw new SWCException(ex.getMessage());
        }

        return output;
    }

    // Retrieves extreme event storm depths at different return periods for
    // a specific precip. station and climate change table.
    private List<Double> getMaxRainAdjustments(String maxRainTable, String rainStationID)
            throws SWCException {

        String line = null;
        List<Double> output = new ArrayList<Double>();

        try {
            BufferedReader bufReader = new BufferedReader(new StringReader(maxRainTable));
            while ((line = bufReader.readLine()) != null) {
                if (line == null) {
                    return output;
                }
                if (line.startsWith(rainStationID)) {
                    String[] values = line.split("\\s+");
                    if (values.length >= 7) {//Copy split out values to the array, excluding i=0 which is the rainID    
                        for (int i = 1; i <= 6; i++) {
                            output.add(Double.parseDouble(values[i]) / 25.4);  // convert from mm to inches
                        }
                    }
                    return output;
                }
            }
        } catch (Exception ex) {
            logger.error("ClimateServiceImpl.getMaxRainAdjustments error: " + ex.getMessage());
            throw new SWCException(ex.getMessage());
        }
        return output;
    }

    // Returns the climate-adjusted set of monthly evaporation rates for the
    // current evap. station and choice of climate change scenario.
    @Override
    public String getEvapData(SiteData siteData) throws SWCException {

        System.out.println("####### ClimateServiceImpl.getEvapData");

        System.out.println("siteData.getEvapStationID()");
        System.out.println(siteData.getEvapStationID());

        System.out.println("siteData.getEvapStationID()");
        System.out.println( siteData.getClimateYear());

        System.out.println("siteData.getEvapStationID()");
//        System.out.println( siteData.getClimateModel());

        //PointPairList evapData;
        List<Double> evapData = new ArrayList<Double>();

        updateEvapAdjustments(siteData.getEvapStationID(), siteData.getClimateYear(), siteData.getClimateModel());

        System.out.println("siteData.getClimateScenario():");
//        System.out.println(siteData.getClimateScenario());

        // ########## !!!!!!!!!!!!!!!!!!!!!!!

        Integer climateIndex = siteData.getClimateScenario();

        if(climateIndex == null){
            System.err.println("!!!!!!!! Integer climateIndex = siteData.getClimateScenario();  == null");
            climateIndex = -1;
        }



        switch (climateIndex) {
            case 0:
                evapData = siteData.getClimateModel().getEvap0();
                break;
            case 1:
                evapData = siteData.getClimateModel().getEvap1();
                break;
            case 2:
                evapData = siteData.getClimateModel().getEvap2();
                break;
            case 3:
                evapData = siteData.getClimateModel().getEvap3();
                break;
            default:
                return "";
        }

       System.out.println("evapData ONE= " + evapData.toString());

        String s = "";

        for (int i = 0;
                i < 12; i++) {
            s = s + evapData.get(i).toString() + "  ";
        }

       System.out.println("s = " + s);

        return s;

    }

// Finds adjustments to monthly evap. rates for a choice of evap. station
// and climate projection year.
    private void updateEvapAdjustments(String evapStationID, int climateYear, ClimateModel climateModel) throws SWCException {

        System.out.println("####### ClimateServiceImpl.updateEvapAdjustments");
        System.out.println("evapStationID = [" + evapStationID + "], climateYear = [" + climateYear + "], climateModel = [" + climateModel + "]");

        System.out.println("input climateModel: ");
//        System.out.println("climateModel.getEvap0() = " + climateModel.getEvap0().toString());
//        System.out.println("climateModel.getEvap1() = " + climateModel.getEvap1().toString());
//        System.out.println("climateModel.getEvap2() = " + climateModel.getEvap2().toString());
//        System.out.println("climateModel.getEvap3() = " + climateModel.getEvap3().toString());


        // Get evap values for each scenario
        //Passed in from front end evapID = GeoData.GetEvapStationID(SiteData.evapSourceIndex);  --D4EMLite
        if (climateYear == 2035) {
            climateModel.setEvap1(getEvapAdjustments(Utils.readFile(Constants.PMET2035HOT), evapStationID));
            climateModel.setEvap2(getEvapAdjustments(Utils.readFile(Constants.PMET2035MED), evapStationID));
            climateModel.setEvap3(getEvapAdjustments(Utils.readFile(Constants.PMET2035WET), evapStationID));
        } else {
            climateModel.setEvap1(getEvapAdjustments(Utils.readFile(Constants.PMET2060HOT), evapStationID));
            climateModel.setEvap2(getEvapAdjustments(Utils.readFile(Constants.PMET2060MED), evapStationID));
            climateModel.setEvap3(getEvapAdjustments(Utils.readFile(Constants.PMET2060WET), evapStationID));
        }

        climateModel.setEvap0(geoDataService.getEvapDataTimeSeriesFormat(evapStationID, Boolean.FALSE));

        System.out.println("!!!!!!!!!!! update incoming Object !!!!!!!!!!!!!!!");
        System.out.println("updated climateModel: ");
//        System.out.println("climateModel.getEvap0() = " + climateModel.getEvap0().toString());
//        System.out.println("climateModel.getEvap1() = " + climateModel.getEvap1().toString());
//        System.out.println("climateModel.getEvap2() = " + climateModel.getEvap2().toString());
//        System.out.println("climateModel.getEvap3() = " + climateModel.getEvap3().toString());
    }


    // Retrieves the climate-adjusted set of monthly evaporation rates for
    // a specific precip. station and climate change table.
    private List<Double> getEvapAdjustments(String evapTable, String evapStationID)
            throws SWCException {


        System.out.println("##### ClimateServiceImpl.getEvapAdjustments");
//        System.out.println("evapTable = [" + evapTable + "], evapStationID = [" + evapStationID + "]");

        String line = null;
        List<Double> output = new ArrayList<Double>();

        try {
            BufferedReader bufReader = new BufferedReader(new StringReader(evapTable));
            while ((line = bufReader.readLine()) != null) {
                if (line == null) {
                    return output;
                }
                if (line.startsWith(evapStationID)) {
                    //String[] values = line.split(default(Char[]), StringSplitOptions.RemoveEmptyEntries);
                    String[] values = line.split("\\s+");
                    if (values.length >= 14) {//Copy split out values to the array, excluding i=0 which is the rainID    
                        for (int i = 2; i <= 13; i++) {
                            output.add(Double.parseDouble(values[i]));
                        }
                    }
                }
            }
            if (output.isEmpty()) {
                logger.equals("climateDataService.getEvapAdjustments: Error finding data for evap station ID - " + evapStationID);
                throw new SWCException("Unable to find data for evaporation station ID " + evapStationID);
            }
        } catch (Exception ex) {
            logger.error("ClimateServiceImpl.getEvapAdjustments error: " + ex.getMessage());
            throw new SWCException(ex.getMessage());
        }

//        System.out.println("output = " + output.toString());

        return output;

    }

    @Override
    //public static String GetPrecipData(int climateIndex) {
    public String getPrecipData(SiteData siteData) throws SWCException {

        // Update the adjustment factors for the various climate change
        // scenarios in case they haven't already been made
        updateAdjustments(siteData);

        // If no climate change scenario selected then do nothing
        if (siteData.getClimateScenario() == 0) {
            return "";
        }

        // Identify the rainfall adjustments for the selected climate scenario
        //TODO temp until we know what format chart needs
        List<Double> rainDelta = new ArrayList<Double>();
        //PointPairList rainDelta;
        if (siteData.getClimateScenario() == 1) {
            rainDelta = siteData.getClimateModel().getRainDelta1();
        } else if (siteData.getClimateScenario() == 2) {
            rainDelta = siteData.getClimateModel().getRainDelta2();
        } else {
            rainDelta = siteData.getClimateModel().getRainDelta3();
        }

        // Concatenate monthly adjustment factors into SWMM input line
        String s = "Rainfall";
        double x;
        for (int i = 0; i < 12; i++) {
            //x = 1.0 + rainDelta[i]Y / 100;
            x = 1.0 + rainDelta.get(i) / 100;
            s = s + "  " + x;   //.toString();
        }
        return s;

    }

    // Retrieves the set of extreme event rainfall depths for the current
    // choice of climate change scenario.
    @Override
    public void getExtremeRainfall(SiteData siteData) throws SWCException {    //, ref double[] r)
        {
            List<Double> maxRain;
            Integer climateIndex = siteData.getClimateScenario();

            if (climateIndex == 0) {
                maxRain = siteData.getClimateModel().getmaxRainHistorical(); //maxRainHistorical;
            } else if (climateIndex == 1) {
                maxRain = siteData.getClimateModel().getMaxRain1();   //maxrain1;
            } else if (climateIndex == 2) {
                maxRain = siteData.getClimateModel().getMaxRain2();   //maxrain2;
            } else {
                maxRain = siteData.getClimateModel().getMaxRain3();   //maxrain3;
            }
            Double[] r = new Double[maxRain.size()];
            Arrays.fill(r, new Double(0));    //have to initialize to 0 otherwise null

            for (int i = 0; i < maxRain.size(); i++) {
                r[i] = maxRain.get(i);
            }
            siteData.getXEventModel().setRainfall(r);
        }

    }
}
