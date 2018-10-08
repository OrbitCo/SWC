/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service.common;

import java.io.File;
import java.util.ArrayList;

/**
 *
 * @author UYEN.TRAN
 */
public class Constants {

    //path to application temp dir
    public static final String FILE_PATH = System.getProperty("SWCALCULATOR_HOME") + File.separator
            + "temp";

    public static final String FILE_PATH_SWC_DATA = System.getProperty("SWCALCULATOR_HOME") + File.separator
            + "data" + File.separator;

    public static final String FILE_PATH_HMS_DATA = System.getProperty("SWCALCULATOR_HOME") + File.separator
            + "data" + File.separator
            + "hms" + File.separator;;

    public static final String FILE_PATH_INPUT = FILE_PATH + File.separator + "inpFile";
    public static final String FILE_PATH_INPUT_BASE = FILE_PATH + File.separator + "inpFile1";
    public static final String FILE_PATH_RPT = FILE_PATH + File.separator + "rptFile";
    public static final String FILE_PATH_OUTPUT = FILE_PATH + File.separator + "outFile";
    //NOT NEEDED public static final String FILE_PATH_RAIN = FILE_PATH + File.separator + "rainFile";

    public static final String FILE_EXT_DAT = ".dat";
    public static final String FILE_EXT_INP = ".inp";
    public static final String FILE_EXT_OUT = ".out";
    public static final String FILE_EXT_RPT = ".rpt";

    //climateService Rain Adjustments
    public static final String PREC2035HOT = "PREC2035Hot.txt";
    public static final String PREC2035MED = "PREC2035Med.txt";
    public static final String PREC2035WET = "PREC2035Wet.txt";
    public static final String PREC2060HOT = "PREC2060Hot.txt";
    public static final String PREC2060MED = "PREC2060Med.txt";
    public static final String PREC2060WET = "PREC2060Wet.txt";

    //climateService Max Rain Adjustments
    public static final String GEVDEPTH2035HOT = "GEVdepth2035Hot.txt";
    public static final String GEVDEPTH2035MED = "GEVdepth2035Med.txt";
    public static final String GEVDEPTH2035WET = "GEVdepth2035Wet.txt";
    public static final String GEVDEPTH2060HOT = "GEVdepth2060Hot.txt";
    public static final String GEVDEPTH2060MED = "GEVdepth2060Med.txt";
    public static final String GEVDEPTH2060WET = "GEVdepth2060Wet.txt";
    public static final String GEVDEPTH_HISTORICAL = "GEVdepth_historical.txt";

    //climateService Evap
    public static final String PMET2035HOT = "Pmet2035Hot.txt";
    public static final String PMET2035MED = "Pmet2035Med.txt";
    public static final String PMET2035WET = "Pmet2035Wet.txt";
    public static final String PMET2060HOT = "Pmet2060Hot.txt";
    public static final String PMET2060MED = "Pmet2060Med.txt";
    public static final String PMET2060WET = "Pmet2060Wet.txt";

    //
    public static final String PREC_SCS_TYPE = "PREC_SCS_Types.txt";
    public static final String PREC_SCS_24HOUR = "SCS24Hour.txt";
   
    /**
     * **** LID Data *****
     */
    public static final double LID_CISTERN_HT = 48;  //generic cistern height in inches

    /**
     * **** Climate Data *****
     */
    public static final String[] CLIMATE_MONTH_LABELS
            = //monthLabels =
            {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

    //returnPeriods
    public static final String[] CLIMATE_RETURN_PERIODS = {"5", "10", "15", "30", "50", "100"};

    //scenarioNames
    public static final String[] CLIMATE_SCENARIO_NAMES = {"None", "Hot/Dry", "Median", "Warm/Wet"};

    /**
     * **** Site Data *****
     */
    public static final Double SITE_DATA_AREA = 10.0;

    // Default Land Cover parameters
    public static final Double[] SITE_DATA_D_STORE = {0.4, 0.3, 0.2, 0.25, 0.1, 0.05};
    public static final Double[] SITE_DATA_ROUGHNESS = {0.4, 0.2, 0.3, 0.04, 0.03, 0.01};

    // Default Slope values
    public static final String[] SITE_DATA_SLOPE = {"2", "5", "10", "20"};

    // Default soil parameters by Hydologic Soil Group
    public static final String[] SITE_DATA_SOIL_GROUP_TXT = {"A", "B", "C", "D"};
    public static final String[] SITE_DATA_KSAT = {"4.0", "0.4", "0.04", "0.01"};
    public static final String[] SITE_DATA_SUCT = {"2.4", "5.1", "8.7", "10.5"};
    public static final String[] SITE_DATA_IMD = {"0.38", "0.26", "0.15", "0.10"};

    /**
     * **** Runoff Data *****
     */

    // Daily Runoff Threshold (in)
    public static final Integer RECD_SZ = 4;  // record size in SWMM output file

    /* GEODATA
    public static final int GEODATA_MAX_COORD_COUNT = 1000;//600;

    // Incremental radius used to search for data
    public static final double GEODATA_SOILS_RADIUS_INCREMEMNT = 1000.0;  // meters

    public static final String[] GEODATA_SOIL_GROUPS = {"A", "B", "C", "D"};
    //public static final List soilPolygons = new ArrayList();
    public static final int GEODATA_MAX_MET_STATIONS = 5;
     */
    //BLS
    public static final Double BLS_MAX_VALIDITY_DISTANCE = 100.00;    // max distance from center for center to be used
    public static final Integer BLS_POSITION_OF_NATIONAL_DEFAULT_IN_LIST = 3; // National value is fourth item in the list (0-indexed)

    public static final String MISSING_PARAM = "Missing parameter values: ";
    
    public static final String EMAIL_SUBJ_RAINFALL = "EPA Stormwater Calculator Rainfall Data";
    public static final String EMAIL_SUBJ_EVAP = "EPA Stormwater Calculator Evaporation Data";
    public static final String EMAIL_SUBJ_SITE = "EPA Stormwater Calculator Site File";
    
    public static final String EMAIL_BODY_DATA = "The attached file contains the data requested.";
    public static final String EMAIL_BODY_SITE = "The attached file contains your saved Site Data.";

}
