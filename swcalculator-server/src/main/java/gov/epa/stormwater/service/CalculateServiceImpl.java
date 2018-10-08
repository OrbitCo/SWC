/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.dll.Swmm5Dll;
import gov.epa.stormwater.dll.Swmm5DllImpl;
import gov.epa.stormwater.model.LandCovers;
import gov.epa.stormwater.model.RunoffModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.SiteDataModel;
import gov.epa.stormwater.model.XEventModel;
import static gov.epa.stormwater.model.XEventModel.N_EVENTS;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import gov.epa.stormwater.transform.Transformer;

import java.io.*;
import java.nio.file.Files;
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.logging.Level;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author UYEN.TRAN
 */
@Service("calculateService")
public class CalculateServiceImpl implements CalculateService {

    private static Logger logger = LoggerFactory
            .getLogger(CalculateServiceImpl.class);

    @Autowired
    private Transformer modelDtoTransformer;

    @Autowired
    ClimateService climateService;

    @Autowired
    RunoffService runoffService;

    @Autowired
    LidDataService lidDataService;

    @Autowired
    GeoDataService geoDataService;

    @Autowired
    private HmsService hmsService;

    @Override
    public int runSwmm(String inFile, String rptFile, String outFile) throws SWCException {
        int exitValue = -999;


// --original
//        //does not work if try to implement Swmm5Dll as a service
//        Swmm5Dll swmmRun = new Swmm5DllImpl();
//        //just need to pass in String path of files
//        exitValue = Swmm5Dll.swmm_run(inFile, rptFile, outFile);


// -- singleton
        exitValue = Swmm5DllImpl.getInstance().swmm_run(inFile, rptFile, outFile);





// -- process builder original


//        try {
//            // original path
////            ProcessBuilder probuilder = new ProcessBuilder(new String[]{"D:\\Public\\Servers\\Apps\\EPASWM~1.1\\swmm5.exe", inFile, rptFile, outFile});
////            probuilder.directory(new File("D:\\Public\\Servers\\Apps\\EPASWM~1.1\\"));
//
//
//            // my path
//            // C:\\swcalculator_home\\EPA_SWMM_5.1
//            ProcessBuilder probuilder = new ProcessBuilder(new String[]{"C:/swcalculator_home/EPA_SWMM_5.1/swmm5.exe", inFile, rptFile, outFile});
//            probuilder.directory(new File("C:/swcalculator_home/EPA_SWMM_5.1/"));
//
//            System.out.println("process builder start...");
//            Process process = probuilder.start();
//            InputStream is = process.getInputStream();
//            InputStreamReader isr = new InputStreamReader(is);
//            BufferedReader br = new BufferedReader(isr);
//
//            System.out.println(" ######## CalculateServiceImpl.runSwmm");
//            while(true) {
//                if (br.readLine() == null) {
//                    System.out.println(" >> runSwmm  br == null");
//                    try {
//                        exitValue = process.waitFor();
//                        logger.debug("SWMM5.exe Exit Value is " + exitValue);
//                        System.out.println(">>>>>> try exitValue = " + exitValue);
//                    } catch (InterruptedException var12) {
//                        System.out.println("var12 = " + var12);
//                        var12.printStackTrace();
//                    }
//                    break;
//                }
//                System.out.println("<<<< Swmm5 wait while");
//            }
//        } catch (IOException var13) {
//            java.util.logging.Logger.getLogger(CalculateServiceImpl.class.getName()).log(Level.SEVERE, (String)null, var13);
//        }
//
//        logger.debug("runSwmm results: " + exitValue);
//
//        System.out.println(">>>>>>>>>>>>>>> return exitValue = " + exitValue);


        return exitValue;

    }

    @Override
    public SiteData computeResults(SiteDataModel siteDataModel) throws SWCException, IOException {

        int i = 0;

        SiteData siteData = getSiteData(siteDataModel);

        setStartEndYears(siteData);
        // Retrieve rainfall data file
        String rainFile = null;

        try {
            rainFile = geoDataService.getRainfallDataFile(siteData.getPrecStationID());
            if (rainFile == null) {
                logger.error("CalculateServiceImpl.calculate(): Error trying to find rainfall data file for precStationID: " + siteData.getPrecStationID());
                throw new SWCException("Could not retrieve rainfall data for this site.");
            }

          if (siteData.getIsHms()) {
                System.out.println("***HMS SERVICE ");
                hmsService.getHMSData("2017", "2018");
                siteData.setRainFile(Constants.FILE_PATH_HMS_DATA + rainFile);
            } else {


                siteData.setRainFile(Constants.FILE_PATH_SWC_DATA + rainFile);
            }

              // Apply climate change adjustments
            climateService.updateAdjustments(siteData);

            // Create a base SWMM input file for the site
            writeBaseInpFile(siteData);

            // Modify the base input file for a long term simulation
            writeLongTermInpFile(siteData);

            i = runSwmm(siteData.getInpFile(), siteData.getRptFile(), siteData.getOutFile());

            if (i > 0) {
                logger.error("CalculateService.computeResults: Error running SWMM with error code:" + +i);
                throw new SWCException("SWMM encountered an error: error code = " + i);
            }

            // Get annual water budget for long term run
            siteData.setRunoffModel(runoffService.getWaterBudget(siteData.getYearsAnalyzed(), siteData.getRptFile()));    //, ref Runoff.annualRainfall, ref Runoff.annualRunoff,
//, ref Runoff.annualRainfall, ref Runoff.annualRunoff,
            //ref Runoff.annualInfil, ref Runoff.annualEvap);

            // Calculate statistics of runoff time series
            //calcStatistics(); --> Runoff.GetStats(SiteData.outFile);
            i = runoffService.getStats(siteData.getOutFile(), siteData);

            if (i > 0) {
                logger.error("CalculateService.computeResults: Could not compute runoff statistics: error code:" + +i);
                throw new SWCException("Could not compute runoff statistics: error code = " + i);
            }

            /*
            if (errorCode > 0)
            {
                MessageBox.Show("Could not compute runoff statistics.", "Run Time Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
        
            
        //**** SWMM run again in this method mf.RunSwmm(); */
            // Run series of single extreme event simulations
            runExtremeEvents(siteData);
            /*
            if (errorCode > 0)
            {
                MessageBox.Show("Could not analyze extreme storm events.", "Run Time Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
        
             */
        } finally {
            //Delete files used during process
            try {
                File file;
                file = new File(siteData.getInpFile());
              /*  Files.deleteIfExists(file.toPath());
                file = new File(siteData.getInpFileBase());
                Files.deleteIfExists(file.toPath());
                file = new File(siteData.getRptFile());
                Files.deleteIfExists(file.toPath());
                file = new File(siteData.getOutFile());
                Files.deleteIfExists(file.toPath()); */
            } catch (Exception e) {

            }
        }
        return siteData;
    }

    private SiteData getSiteData(SiteDataModel siteDataModel) {

        //SiteData output = new SiteData();       
        SiteData siteData = modelDtoTransformer.transformObject(siteDataModel, SiteData.class);

        // Site soil group
        siteData.setSoilGroup(getSiteSoilGroup(siteData.getHydSoilGroup()));

/*        
        // Ksat value
        siteData.setSoilKsat(0.0);
        if (siteData.getHydConductivity() != null) {
            siteData.setSoilKsat(siteData.getHydConductivity());
        }
*/        
        /* DO NOT NEED b/c value comes from UI
        if (tbKsat.TextLength > 0) {
            try {
                SiteData.soilKsat = Double.Parse(tbKsat.Text);
            } catch  {
                MessageBox.Show("Illegal numeric value assigned to conductivity.",
                        "Input Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
        }
         */

 /* from UI as rainSource, evapSource, climateScenario
        // Rain & evap data sources
        output.rainSourceIndex = lbRainSource.SelectedIndex;
        output.evapSourceIndex = lbEvapSource.SelectedIndex;
        output.climateScenarioIndex = GetClimateIndex();
         */
        // Land cover, LID controls, slope, and overland flow length
        /* from UI as percForet, percMeadow, etc...
        if (!GetLandCover()) {
            return false;
        }
         */
        setLandCover(siteData);
        setLidControls(siteData);

        //if (!GetLidControls(siteData)) {
        //    return false;
        //}
        siteData.setSlopeIndex(getSlopeIndex(siteData.getSurfaceSlope()));
        siteData.setPathLength(new Double(150));             // NOTE: path length hard-coded here

        return siteData;

    }

    private void setLidControls(SiteData siteData) {
        
        siteData.setFracImpDiscon((double) siteData.getPercDisconnection() / 100.0);
        siteData.setFracRainHarvest((double) siteData.getPercHarvesting() / 100.0);
        siteData.setFracRainGarden((double) siteData.getPercRainGardens() / 100.0);
        siteData.setFracGreenRoof((double) siteData.getPercGreenRoofs() / 100.0);
        siteData.setFracStreetPlanter((double) siteData.getPercStreetPlanters() / 100.0);
        siteData.setFracInfilBasin((double) siteData.getPercInfilBasin() / 100.0);
        siteData.setFracPorousPave((double) siteData.getPercPorousPavement() / 100.0);
        
        //additions for cost module
        siteData.setTotalLIDAreaFrac(siteData.getFracImpDiscon() + siteData.getFracRainHarvest() + siteData.getFracRainGarden() + siteData.getFracGreenRoof() + siteData.getFracStreetPlanter() + siteData.getFracInfilBasin() + siteData.getFracPorousPave());

        //from UI siteData.isNewDevelopment =rbCostNewDev.Checked;
        //from UI siteData.isReDevelopment= rbCostRedev.Checked;
        //Cost complexity siteSuitabiltiy
        siteData.setSiteSuitability(0);
        if (siteData.getSiteSuitabilityPoor()) {
            siteData.setSiteSuitability(0);
        }
        if (siteData.getSiteSuitabilityModerate()) {
            siteData.setSiteSuitability(1);
        }
        if (siteData.getSiteSuitabilityExcellent()) {
            siteData.setSiteSuitability(2);
        }

        // Check for valid LID inputs
        //TODO - should this be done in the front end.... return LidData.Validate();
    }

    private void setLandCover(SiteData siteData) {

        Double[] lc = new Double[siteData.getLandCover().length];
        lc[0] = siteData.getPercForest();
        lc[1] = siteData.getPercMeadow();
        lc[2] = siteData.getPercLawn();
        lc[3] = siteData.getPercDesert();
        lc[4] = new Double(0);  //not used
        lc[5] = siteData.getPercImpervious();
        siteData.setLandCover(lc);

        siteData.setFracImperv(siteData.getLandCover()[5] / 100);

        /*For UI to validate!!!
            double totalCover = 0.0;
            for (int i = 0; i < SiteData.landCover.Length; i++) totalCover += SiteData.landCover[i];
            if (totalCover > 100)
            {
                MessageBox.Show(
                    "Total land cover exceeds 100%",
                    "Land Cover Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            return true;
        }        
         */
    }

    private int getSiteSoilGroup(String soilGroup) {

        switch (soilGroup) {
            case "A":
                return 0;
            case "B":
                return 1;
            case "C":
                return 2;
            case "D":
                return 3;
        }
        return 3;

    }

    private int getSlopeIndex(int surfaceSlope) {
        /* In SWC, slope index captured as surfaceSlope 0=2 1=5, 2=10, 3=20        
        if (rbFlatSlope.Checked) {
            return 0;
        }
        if (rbModFlatSlope.Checked) {
            return 1;
        }
        if (rbModSteepSlope.Checked) {
            return 2;
        }
        return 3;
         */

        switch (surfaceSlope) {
            case 2:
                return 0;
            case 5:
                return 1;
            case 10:
                return 2;
        }

        return 3;

    }

    public void setStartEndYears(SiteData siteData) throws SWCException {

        geoDataService.setStartEndYearsPrecip(siteData);

        Integer years = siteData.getYearsAnalyzed();
        int yrs = siteData.getEndYear() - siteData.getStartYear() + 1;
        if (yrs >= years) {
            yrs = years;
        }
        siteData.setStartYear(siteData.getEndYear() - yrs + 1);

    }

    public void writeBaseInpFile(SiteData siteData) throws SWCException {

        String line = "";

        try {
            File file = Utils.createSWCFile(siteData.getInpFileBase());
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            //Write data
            Utils.writeLine(bw, "[OPTIONS]");
            Utils.writeLine(bw, "FLOW_UNITS  CFS");
            Utils.writeLine(bw, "INFILTRATION  GREEN_AMPT");
            Utils.writeLine(bw, "FLOW_ROUTING  KINWAVE");
            Utils.writeLine(bw, "REPORT_STEP  0:15:00");
            Utils.writeLine(bw, "WET_STEP  0:05:00");
            Utils.writeLine(bw, "DRY_STEP  1:00:00");
            Utils.writeLine(bw, "ROUTING_STEP  60");
            Utils.writeLine(bw, "START_TIME  0:00:00");
            Utils.writeLine(bw, "END_TIME  23:59:59");
            Utils.writeLine(bw, "START_DATE  01/01/" + siteData.getStartYear());
            Utils.writeLine(bw, "END_DATE  12/31/" + siteData.getEndYear());
            Utils.writeLine(bw, "TEMPDIR  \"" + Constants.FILE_PATH + "\"");
            Utils.writeLine(bw, "");

            Utils.writeLine(bw, "[EVAPORATION]");
            //Utils.writeLine(bw, "MONTHLY  " + climateService.getEvapData(siteData.getClimateScenario(), siteData.getEvapStationID(), siteData.getClimateYear()));
            Utils.writeLine(bw, "MONTHLY  " + climateService.getEvapData(siteData) ); //siteData.getClimateScenario(), siteData.getEvapStationID(), siteData.getClimateYear()));
            Utils.writeLine(bw, "DRY_ONLY  YES");
            Utils.writeLine(bw, "");

            // Raingages (dummy RainGage2 used for retention BMP)
            Utils.writeLine(bw, "[RAINGAGES]");
            Utils.writeLine(bw, "RainGage2  INTENSITY  1:00  1.0  TIMESERIES  TS1");
            Utils.writeLine(bw, "");

            // Subcatchments
            Utils.writeLine(bw, "[SUBCATCHMENTS]");
            writeSubcatchments(bw, siteData);
            Utils.writeLine(bw, "");
            Utils.writeLine(bw, "[SUBAREAS]");
            writeSubareas(bw, siteData);
            Utils.writeLine(bw, "");

            // Infiltration parameters
            Utils.writeLine(bw, "[INFILTRATION]");
            line = Constants.SITE_DATA_SUCT[siteData.getSoilGroup()] + "  ";
            if (siteData.getSoilKsat() <= 0.0) {
                siteData.setSoilKsat(Double.parseDouble(Constants.SITE_DATA_KSAT[siteData.getSoilGroup()]));
            }
            //if (soilKsat <= 0.0) soilKsat = Double.Parse(ksat[soilGroup]);
            line += siteData.getSoilKsat();  //soilKsat.ToString();
            line += "  " + Constants.SITE_DATA_IMD[siteData.getSoilGroup()];
            Utils.writeLine(bw, "Subcatch1  " + line);
            Utils.writeLine(bw, "Subcatch2  " + line);
            Utils.writeLine(bw, "Subcatch3  " + line);
            Utils.writeLine(bw, "Subcatch4  " + line);
            Utils.writeLine(bw, "");

            // LID controls
            //LidData.writeLidControls(bw, siteData);
            lidDataService.writeLidControls(bw, siteData);

            Utils.writeLine(bw, "");
            //LidData.writeLidUsage(bw, siteData);
            lidDataService.writeLidUsage(bw, siteData);
            Utils.writeLine(bw, "");

            // Outfall Node
            Utils.writeLine(bw, "[OUTFALLS]");
            Utils.writeLine(bw, "Outfall1  0.0  FREE");
            Utils.writeLine(bw, "");

            // Rainwater Harvesting
            if (siteData.getRhImpervArea() > 0) {
                // Model cisterns as a storage node with infiltration
                Utils.writeLine(bw, "[STORAGE]");

                // Storage height = cistern height (ft)
                double maxHt = Constants.LID_CISTERN_HT / 12;

                // Cistern area in sq ft
                double cisternArea = Double.parseDouble(siteData.getLidModel().getRhSize().toString()) / 7.85 / maxHt;

                // Total storage surface area (sqft) =  # cisterns/1000 sqft *
                //    capture area (1000 sqft) * cistern area (sqft)
                double a0 = Double.parseDouble(siteData.getLidModel().getRhNumber().toString()) * siteData.getRhImpervArea() * 43560
                        / 1000 * cisternArea;

                // Infil. rate from storage (in/hr) =  cistern drain rate (ft3/day) /
                //    cistern area (ft2) * 12 in/ft / 24 hr/day
                double infilRate = Double.parseDouble(siteData.getLidModel().getRhDrainRate().toString()) / 7.85 / cisternArea / 2;

                // Input storage node line
                line = "Cisterns  0  " + new DecimalFormat("#0.00").format(maxHt)
                        + "  0  FUNCTIONAL  0  0  " + new DecimalFormat("#0.00").format(a0) + "  0  0  2.4  "
                        + infilRate + "  0";
                Utils.writeLine(bw, line);
                Utils.writeLine(bw, "");

                // Connect cistern overflow to system outlet with a dummy conduit
                Utils.writeLine(bw, "[CONDUITS]");
                Utils.writeLine(bw, "Dummy2  Cisterns  Outfall1  400  0.01  0  0  0");
                Utils.writeLine(bw, "");
                Utils.writeLine(bw, "[XSECTIONS]");
                Utils.writeLine(bw, "Dummy2  DUMMY  0  0  0  0  1");
                Utils.writeLine(bw, "");
            } else {
                Utils.writeLine(bw, "[JUNCTIONS]");
                Utils.writeLine(bw, "Cisterns  0");
                Utils.writeLine(bw, "");
            }

            // Dummy time series for no rainfall
            Utils.writeLine(bw, "[TIMESERIES]");
            Utils.writeLine(bw, "TS1  0  0");
            Utils.writeLine(bw, "");

            // Only save node results to binary output file
            Utils.writeLine(bw, "[REPORT]");
            Utils.writeLine(bw, "SUBCATCHMENTS  NONE");
            Utils.writeLine(bw, "NODES ALL");
            Utils.writeLine(bw, "LINKS NONE");
            Utils.writeLine(bw, "");

            //Done writing
            bw.flush();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("CalculateServiceImpl.writeBaseInFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        }
    }

    // Total impervious and pervious areas for site w/o LIDs
    public void writeSubcatchments(BufferedWriter bw, SiteData siteData) throws SWCException {

        double impervArea = Constants.SITE_DATA_AREA * siteData.getFracImperv();
        double pervArea = Constants.SITE_DATA_AREA - impervArea;

        // Areas associated with Impervious Disconnection LID (Subcatch2)
        siteData.setIdImpervArea(siteData.getFracImpDiscon() * impervArea);
        siteData.setIdPervArea(Double.parseDouble(siteData.getLidModel().getIdCapture().toString()) / 100 * siteData.getIdImpervArea());

        // Infiltration basin areas (Subcatch3)
        siteData.setIbImpervArea(siteData.getFracInfilBasin() * impervArea);
        siteData.setIbPervArea(siteData.getIbImpervArea() * Double.parseDouble(siteData.getLidModel().getIbCapture().toString()) / 100);

        // Rain harvesting areas (Subcatch4)
        siteData.setRhImpervArea(siteData.getFracRainHarvest() * impervArea);

        // Areas of LIDs placed in main subcatchment (Subcatch1)
        siteData.setPpArea(siteData.getFracPorousPave() * impervArea * Double.parseDouble(siteData.getLidModel().getPpCapture().toString()) / 100);
        siteData.setRgArea(siteData.getFracRainGarden() * impervArea * Double.parseDouble(siteData.getLidModel().getRgCapture().toString()) / 100);
        siteData.setSpArea(siteData.getFracStreetPlanter() * impervArea * Double.parseDouble(siteData.getLidModel().getSpCapture().toString()) / 100);
        siteData.setGrArea(siteData.getFracGreenRoof() * impervArea);

        // Area of main subcatchment (Subcatch1)
        double lidArea = siteData.getPpArea() + siteData.getRgArea() + siteData.getSpArea() + siteData.getGrArea();      // LID area
        siteData.setImpervArea1(impervArea - siteData.getIdImpervArea() - siteData.getIbImpervArea() // impervious area
                - siteData.getPpArea() - siteData.getSpArea() - siteData.getGrArea() - siteData.getRhImpervArea());
        siteData.setPervArea1(pervArea - siteData.getIdPervArea() - siteData.getIbPervArea() - siteData.getRgArea()); // pervious area
        siteData.setArea1(siteData.getImpervArea1() + siteData.getPervArea1() + lidArea);               // total area

        // Input line for Subcatch1 (main subcatchment)
        if (siteData.getArea1() == 0.0) {
            Utils.writeLine(bw, "Subcatch1  RainGage2  Outfall1  0  100  0  0  0");
        } else {
            String line = "Subcatch1  RainGage1  Outfall1  " + new DecimalFormat("#0.00").format(siteData.getArea1());    //Double.toString(siteData.getArea1());
            double imp1 = siteData.getImpervArea1() / (siteData.getArea1() - lidArea) * 100.0;
            line = line + "  " + Double.toString(imp1);
            double width = (siteData.getArea1() - lidArea) * 43560 / siteData.getPathLength();
            line = line + "  " + Double.toString(width);
            line = line + "  " + Constants.SITE_DATA_SLOPE[siteData.getSlopeIndex()] + "  0";
            Utils.writeLine(bw, line);
        }

        // Input line for Subcatch2 (disconnected area subcatchment)
        siteData.setArea2(siteData.getIdImpervArea() + siteData.getIdPervArea());
        if (siteData.getArea2() == 0.0) {
            Utils.writeLine(bw, "Subcatch2  RainGage2  Outfall1  0  100  0  0  0");
        } else {
            String line = "Subcatch2  RainGage1  Outfall1 " + Double.toString(siteData.getArea2());
            double imp2 = siteData.getIdImpervArea() / siteData.getArea2() * 100.0;
            line = line + "  " + Double.toString(imp2);
            double width = siteData.getArea2() * 43560 / siteData.getPathLength();
            line = line + "  " + width;
            line = line + "  " + Constants.SITE_DATA_SLOPE[siteData.getSlopeIndex()] + "  0";
            Utils.writeLine(bw, line);
        }

        // Input line for Subcatch3 (infiltration basin subcatchment)
        siteData.setArea3(siteData.getIbImpervArea() + siteData.getIbPervArea());
        if (siteData.getArea3() == 0.0) {
            Utils.writeLine(bw, "Subcatch3  RainGage2  Outfall1  0  100  0  0  0");
        } else {
            String line = "Subcatch3  RainGage1  Outfall1 " + siteData.getArea3();
            double imp3 = siteData.getIbImpervArea() / siteData.getArea3() * 100.0;
            line = line + "  " + imp3;
            double width = siteData.getArea3() * 43560 / siteData.getPathLength();
            line = line + "  " + width;
            line = line + "  " + Constants.SITE_DATA_SLOPE[siteData.getSlopeIndex()] + "  0";
            Utils.writeLine(bw, line);
        }

        // Input line for Subcatch4 (rainwater harvesting subcatchment)
        siteData.setArea4(siteData.getRhImpervArea());
        if (siteData.getArea4() == 0) {
            Utils.writeLine(bw, "Subcatch4  RainGage2  Outfall1  0  100  0  0  0");
        } else {
            String line = "Subcatch4  RainGage1  Cisterns  " + siteData.getArea4() + "  100";
            double width = siteData.getArea4() * 43560 / siteData.getPathLength();
            line = line + "  " + width;
            line = line + "  " + Constants.SITE_DATA_SLOPE[siteData.getSlopeIndex()] + "  0";
            Utils.writeLine(bw, line);
        }

    }

    public void writeSubareas(BufferedWriter bw, SiteData siteData) throws SWCException {
        // Impervious roughness & depression storage
        //double impervRoughness = siteData.roughness[(int) LandCovers.IMPERV];
        double impervRoughness = Constants.SITE_DATA_ROUGHNESS[LandCovers.IMPERV.getValue()];

        double impervDstore = Constants.SITE_DATA_D_STORE[LandCovers.IMPERV.getValue()];

        // Pervious roughness & depression storage
        double pervRoughness = 0.0;
        double pervDstore = 0.0;
        double pctPerv = 100.0 * (1.0 - siteData.getFracImperv());
        if (pctPerv > 0.0) {
            for (int i = 0; i < LandCovers.IMPERV.getValue(); i++) {
                double ratio = siteData.getLandCover()[i] / pctPerv;
                pervRoughness += ratio * Constants.SITE_DATA_ROUGHNESS[i];
                pervDstore += ratio * Constants.SITE_DATA_D_STORE[i];
            }
        }

        // Special case for infiltration basin
        double ibPervDstore = 0.0;
        if (siteData.getArea3() > 0.0) {
            ibPervDstore = Double.parseDouble(siteData.getLidModel().getIbHeight().toString());
        }

        // Input line for roughness & depression storage
        String line = Double.toString(impervRoughness);

        line = line + "  " + new DecimalFormat("#0.00").format(pervRoughness) + "  ";   //pervRoughness.ToString("F2") + "  ";
        line = line + impervDstore;
        line = line + "  " + new DecimalFormat("#0.00").format(pervDstore);

        // Main subcatchment with disconnected areas removed
        if (siteData.getArea1() == 0.0) {
            Utils.writeLine(bw, "Subcatch1  0  0  0  0  0  OUTLET");
        } else {
            Utils.writeLine(bw, "Subcatch1  " + line + "  0  OUTLET");
        }

        // Lawn spreading contributing area
        if (siteData.getArea2() == 0.0) {
            Utils.writeLine(bw, "Subcatch2  0  0  0  0  0  OUTLET");
        } else {
            Utils.writeLine(bw, "Subcatch2  " + line + "  0  PERVIOUS");
        }

        // Infiltration Basin contributing area
        if (siteData.getArea3() == 0.0) {
            Utils.writeLine(bw, "Subcatch3  0  0  0  0  0  OUTLET");
        } else {
            Utils.writeLine(bw, "Subcatch3  " + Double.toString(impervRoughness) + "  0  "
                    + Double.toString(impervDstore) + "  " + Double.toString(ibPervDstore) + "  0  PERVIOUS");
        }

        // Rain Harvesting contributing area
        if (siteData.getArea4() == 0.0) {
            Utils.writeLine(bw, "Subcatch4  0  0  0  0  0  OUTLET");
        } else {
            Utils.writeLine(bw, "Subcatch4  " + line + "  0  OUTLET");
        }
    }

    public void writeLongTermInpFile(SiteData siteData) throws SWCException {

        try {
            File file = Utils.createSWCFile(siteData.getInpFile());

            Utils.copyFileUsingFileStreams(Utils.getSWCFile(siteData.getInpFileBase()), file);

            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);
            Utils.writeLine(bw, "[RAINGAGES]");

            //string stationID = GeoData.GetStationID(SiteData.rainSourceIndex);
            String stationID = siteData.getPrecStationID();
            //Pass in location of rain file
            Utils.writeLine(bw,
                    "RainGage1  INTENSITY  1:00  1.0  FILE  \"" + siteData.getRainFile() + "\" " + stationID + " IN");
            Utils.writeLine(bw, " ");

            // Rainfall adjustments
            if (siteData.getClimateScenario() > 0) {
                Utils.writeLine(bw, "[ADJUSTMENTS]");
                //Utils.writeLine(bw, Climate.GetPrecipData(climateScenarioIndex));
                Utils.writeLine(bw, climateService.getPrecipData(siteData));
                Utils.writeLine(bw, " ");
            }

            //Done writing
            bw.flush();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("CalculateServiceImpl.writeLongTermInpFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        }

    }

    //----------------------------------------------------------------
    // Augments a base SWMM input file with additional lines needed to
    // run a single extreme event analysis.
    //----------------------------------------------------------------
    private static void writeExtremeEventInpFile(Double[] ts, SiteData siteData) throws SWCException {
        //String newLine = System.Environment.NewLine;
        //File.Copy(SiteData.inpFile1, SiteData.inpFile, true);
        //using (StreamWriter sw = File.AppendText(SiteData.inpFile)) {
        try {
            File file = Utils.createSWCFile(siteData.getInpFile());

            Utils.copyFileUsingFileStreams(Utils.getSWCFile(siteData.getInpFileBase()), file);
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter bw = new BufferedWriter(fw);

            Utils.writeLine(bw, " ");
            Utils.writeLine(bw, "[RAINGAGES]");
            Utils.writeLine(bw, "RainGage1  CUMULATIVE  0:06  1.0  TIMESERIES  TS24");
            Utils.writeLine(bw, " ");
            Utils.writeLine(bw, "[TIMESERIES]");
            int count = 0;
            int minutes = 6;
            int hours = 0;
            //StringBuilder line = new StringBuilder();
            String line = "TS24";
            for (int j = 1; j < ts.length; j++) {
                line = line + "  " + String.format("%02d", hours) + ":" + String.format("%02d", minutes) + "  " + new DecimalFormat("#0.0000").format(ts[j]);   //sw.Write(String.Format("  {0:00}:{1:00}  {2:0.0000}", hours, minutes, ts[j]));
                count++;
                if (j == ts.length - 1) {
                    line = line + "\n";
                } else if (count == 6) {
                    line = line + "\n" + "TS24";  //sw.Write(newLine + "TS24");                    
                    count = 0;
                }
                minutes += 6;
                if (minutes == 60) {
                    hours += 1;
                    minutes = 0;
                }
            }
            Utils.writeLine(bw, line);
            Utils.writeLine(bw, " ");
            Utils.writeLine(bw, "[OPTIONS]");
            Utils.writeLine(bw, "WET_STEP  0:06:00");
            Utils.writeLine(bw, "DRY_STEP  0:06:00");
            Utils.writeLine(bw, "START_DATE  06/01/" + siteData.getEndYear());
            Utils.writeLine(bw, "END_DATE    06/03/" + siteData.getEndYear());
            //Done writing
            bw.flush();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("CalculateServiceImpl.writeExtremeEventInpFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        }
    }

//--------------------------------------------------
// Runs SWMM for a series of 24-hour extreme events.
//--------------------------------------------------
    public void runExtremeEvents(SiteData siteData) throws SWCException {

        // Rainfall time series array for SCS 24-hr
        // distribution (at 6-minute intervals)
        Double[] rSeries = new Double[241];

        // Dummy water budget variables
        double infil = 0;
        double evap = 0;
        Double[] rainfall = new Double[N_EVENTS];
        Double[] runoff = new Double[N_EVENTS];
        //Use local vars for ease of use and then copy to model
        Double [] peakRainfall = new Double[N_EVENTS];
        Double [] peakRunoff = new Double[N_EVENTS];
        
        try {
            //Load 24 hour SCS distribution which is needed below
            readScsDistributions(siteData);

            // Determine which SCS distribution to apply
            String scsType = getScsType(siteData.getPrecStationID());

            // Get the extreme event rainfall depths for the current
            // precip. station and climate scenario
            //Climate.GetExtremeRainfall(SiteData.climateScenarioIndex, ref rainfall);
            climateService.getExtremeRainfall(siteData);

            // Analyze each return period event
            for (int i = 0; i < siteData.getXEventModel().RETURN_PERIOD.length; i++) {
                // Generate entries in a 24-hour rainfall time series
                switch (scsType) {
                    case "I":
                        rSeries = fillRainTimeSeries(siteData.getXEventModel().getRainfall()[i], siteData.getXEventModel().getScsI());  //rainfall[i], scsI, ref rSeries); 
                        break;
                    case "Ia":
                        rSeries = fillRainTimeSeries(siteData.getXEventModel().getRainfall()[i], siteData.getXEventModel().getScsIa());  //fillRainTimeSeries(rainfall[i], scsIa, ref rSeries); 
                        break;
                    case "II":
                        rSeries = fillRainTimeSeries(siteData.getXEventModel().getRainfall()[i], siteData.getXEventModel().getScsII());  //fillRainTimeSeries(rainfall[i], scsII, ref rSeries); 
                        break;
                    case "III":
                        rSeries = fillRainTimeSeries(siteData.getXEventModel().getRainfall()[i], siteData.getXEventModel().getScsIII());  //dfillRainTimeSeries(rainfall[i], scsIII, ref rSeries); 
                        break;
                }

                // Run SWMM for this storm event
                writeExtremeEventInpFile(rSeries, siteData);
                //mf.RunSwmm();
                int error = runSwmm(siteData.getInpFile(), siteData.getRptFile(), siteData.getOutFile());
                if (error > 0) {
                    logger.error("CalculateService.runExtremeEvents: Error running SWMM for extreme events with error code:" + +i);
                    throw new SWCException("SWMM extreme events encountered an error: error code = " + i);
                }

                RunoffModel runoffModel = runoffService.getWaterBudget(1, siteData.getRptFile());
                rainfall[i] = runoffModel.getAnnualRainfall();
                runoff[i] = runoffModel.getAnnualRunoff();
                infil = runoffModel.getAnnualInfil();
                evap = runoffModel.getAnnualEvap();
                //siteData.getXEventModel().setRainfall(runoffModel.getAnnualRainfall());
                XEventModel xEventModel = runoffService.getPeakValues(siteData.getOutFile(), siteData);
                peakRainfall[i] = xEventModel.getPeakRainfallOne();
                peakRunoff[i] = xEventModel.getPeakRunoffOne();                
            }
            //Copy results into siteData
            siteData.getXEventModel().setRainfall(rainfall);
            siteData.getXEventModel().setRunoff(runoff);            
            siteData.getXEventModel().setPeakRainfall(peakRainfall);
            siteData.getXEventModel().setPeakRunoff(peakRunoff);
            
            //TODO!!!!  SetPlottingData(); -- started function but wait until we decide what is needed for charts
        } catch (Exception ex) {
            // if any error occurs
            ex.printStackTrace();
            logger.error("CalculateService.runExtremeEvents:" + ex.getMessage());
            throw new SWCException("Error running calculations: " + ex.getMessage());
        }
    }

    //------------------------------------------------------------------------
    // Retrieves the SCS design storm distribution type for a precip. station.
    //------------------------------------------------------------------------
    @Override
    public String getScsType(String rainStationID) throws SWCException {
        String output = "";
        //string table = StormwaterCalculator.Properties.Resources.PREC_SCS_Types;
        String table = Utils.readFile(Constants.PREC_SCS_TYPE);
        String line = null;

        try {
            BufferedReader bufReader = new BufferedReader(new StringReader(table));
            while ((line = bufReader.readLine()) != null) {
                if (line == null) {
                    return "II";
                }
                /*
                        line = sr.ReadLine();
                        if (line == null) return "II";
                        if (line.StartsWith(rainID))
                        {
                            string[] values = line.Split(default(Char[]),
                                    StringSplitOptions.RemoveEmptyEntries);
                            if (values.Length >= 2) return values[1];
                        }
                 */
                if (line.startsWith(rainStationID)) {
                    String[] values = line.split("\\s+");
                    if (values.length >= 2) {
                        return values[1];
                    }

                }
            }
        } catch (Exception ex) {
            logger.error("CalculateService.getScsType error: " + ex.getMessage());
            throw new SWCException(ex.getMessage());
        }

        return output;
    }
    //---------------------------------------------------------------
    // Generates a rainfall intensity time series from total rainfall
    // depth and a cumulative time distribution.
    //---------------------------------------------------------------

    private Double[] fillRainTimeSeries(Double rTotal, Double[] dist) {
        Double[] r = new Double[241];
        Arrays.fill(r, new Double(0));    //have to initialize to 0 otherwise null

        for (int i = 0; i < r.length; i++) {
            r[i] = rTotal * dist[i] / 100;
        }

        return r;
    }

    //--------------------------------------------------------------
    // Reads the SCS 24-hour design storm distributions from a file.
    //--------------------------------------------------------------
    public void readScsDistributions(SiteData siteData) throws SWCException {

        String table = Utils.readFile(Constants.PREC_SCS_24HOUR);
        String line = null;

        Double[] scsI = new Double[241];
        Double[] scsIa = new Double[241];
        Double[] scsII = new Double[241];
        Double[] scsIII = new Double[241];

        int i = 0;

        try {
            BufferedReader bufReader = new BufferedReader(new StringReader(table));

            // Skip header line
            //sr.ReadLine();
            bufReader.readLine();

            while ((line = bufReader.readLine()) != null
                    && i < 241) {
                // Read next 241 lines (one per six minute time interval)
                //for (int i = 0; i < 241; i++) {
                //    string line = sr.ReadLine();
                if (line == null) {
                    return;
                }

                // Parse the line for 5 values
                String[] values = line.split("\\s+");
                if (values.length < 5) {
                    return;
                }

                // Save the cumulative percentages for each of the
                // four SCS distributions at the current time interval
                scsI[i] = Double.parseDouble(values[1]);
                scsIa[i] = Double.parseDouble(values[2]);
                scsII[i] = Double.parseDouble(values[3]);
                scsIII[i] = Double.parseDouble(values[4]);

                i += 1;
            }
        } catch (Exception ex) {
            logger.error("CalculateService.readScsDistributions error: " + ex.getMessage());
            throw new SWCException("Error reading SCS 24 hour distribution: " + ex.getMessage());
        }

        siteData.getXEventModel().setScsI(scsI);
        siteData.getXEventModel().setScsIa(scsI);
        siteData.getXEventModel().setScsII(scsII);
        siteData.getXEventModel().setScsIII(scsIII);

    }

       //-------------------------------------------------------------
        // Sets rainfall / runoff plotting values for current scenario. 
        //-------------------------------------------------------------
        private void setPlottingData(SiteData siteData)
        {
            
/* NOT NEEDED            
          bool showingBaseline = (baseExtremeRainfallList.Count > 0);
            extremeRainfallList.Clear();
            extremeRunoffList.Clear();
            peakRainfallList.Clear();
            peakRunoffList.Clear();

            if (!showingBaseline)
            {
                extremeRainfallList.Add(0, 0);
                extremeRunoffList.Add(0, 0);

                peakRainfallList.Add(0, 0);
                peakRunoffList.Add(0, 0);
            }
*/
/*           
            for (int i = 0; i < N_EVENTS; i++)
            {
                siteData.getXEventModel().getExtremeRainfallList().add(siteData.getXEventModel().getRainfall()[i]); //extremeRainfallList.Add(0, rainfall[i]);
                siteData.getXEventModel().getExtremeRunoffList().add(siteData.getXEventModel().getRunoff()[i]); //extremeRunoffList.Add(0, runoff[i]);
                siteData.getXEventModel().getExtremeRainfallList().add(0d); //extremeRainfallList.Add(0, 0);
                siteData.getXEventModel().getExtremeRunoffList().add(0d); //extremeRunoffList.Add(0, 0);

                peakRainfallList.Add(0, peakRainfall[i]);
                peakRunoffList.Add(0, peakRunoff[i]);
                peakRainfallList.Add(0, 0);
                peakRunoffList.Add(0, 0);

                if (showingBaseline && i < nEvents-1)
                {
                    extremeRainfallList.Add(0, 0);
                    extremeRunoffList.Add(0, 0);

                    peakRainfallList.Add(0, 0);
                    peakRunoffList.Add(0, 0);
                }
            }
*/ 
    }
    
    
}
