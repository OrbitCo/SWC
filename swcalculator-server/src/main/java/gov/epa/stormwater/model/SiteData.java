/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import gov.epa.stormwater.service.common.Constants;

import java.util.Arrays;
import java.util.Date;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN This class extends input Site Data from front end and
 * contains all other variables for processing. Not meant to be used for output
 */
@XmlRootElement(name="siteDataResults")
@XmlAccessorType(XmlAccessType.PROPERTY)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SiteData extends SiteDataModel {

    /* Move to constants
    //public const int years = 30;                    // simulation duration (yrs)
    public static final Double AREA = 10.0;

    // Default Land Cover parameters
    public static final Double[] D_STORE = {0.4, 0.3, 0.2, 0.25, 0.1, 0.05};
    public static final Double[] ROUGHNESS = {0.4, 0.2, 0.3, 0.04, 0.03, 0.01};

    // Default Slope values
    public static String[] slope = {"2", "5", "10", "20"};

    // Default soil parameters by Hydologic Soil Group
    public static final String[] SOIL_GROUP_TXT = {"A", "B", "C", "D"};
    public static final String[] KSAT = {"4.0", "0.4", "0.04", "0.01"};
    public static final String[] SUCT = {"2.4", "5.1", "8.7", "10.5"};
    public static final String[] IMD = {"0.38", "0.26", "0.15", "0.10"};
     */
 /*
    private ClimateModel climateModel = new ClimateModel();
    private RunOffModel runOffModel = new RunOffModel();
    private LidModel lidModel = new LidModel();

    // Simulation variables
    public int errorCode;
    public int startYear;
    public int endYear;
    public boolean includePostDev;

    // Site data
    public String name;
    public int soilGroup;
    //hydConductivity
    public Double soilKsat;
    public Double[] landCover;
    public int slopeIndex;
    public Double pathLength;
    //rainsource - public int rainSourceIndex;
    //evapsource - public int evapSourceIndex;

    // File variables
    public String tmpPath;      // Temporary file folder
    public String rainFile;     // Rainfall data file
    public String inpFile;      // Complete SWMM input file
    public String inpFile1;     // Base SWMM input file
    public String rptFile;      // SWMM status report file
    public String outFile;      // SWMM binary results file

    // Subcatchment areas
    public Double fracImperv;    // Total imperv. area fraction
    public Double area1;         // Main subcatchment area
    public Double area2;         // Imperv. disconnection area
    public Double area3;         // Infil. basin source area
    public Double area4;         // Water harvesting source area
    public Double impervArea1;   // Main subcatch. imperv. area
    public Double pervArea1;     // Main subcatch. pervious area

    // Areas treated by LIDs
    public Double fracImpDiscon;
    public Double fracRainGarden;
    public Double fracGreenRoof;
    public Double fracPorousPave;
    public Double fracRainHarvest;
    public Double fracStreetPlanter;
    public Double fracInfilBasin;

    public Double totalLIDAreaFrac;  // cost Module addition sum of all LID areas fraction - no costs if 0

    // Areas devoted to LIDs
    public Double idImpervArea;  // Impervious area disconnected
    public Double idPervArea;    // Pervious area receiving disconnected area
    public Double ibImpervArea;  // Impervious area to Infil. Basin
    public Double ibPervArea;    // Infil. Basin area
    public Double rhImpervArea;  // Rain harvesting impervious area
    public Double rgArea;        // Rain Garden area
    public Double grArea;        // Green Roof area
    public Double spArea;        // Street Planter area
    public Double ppArea;        // Porous Pavement area

    //cost module additions
    public boolean isNewDevelopment; //true if scenario represents new development
    public boolean isReDevelopment; //true if scenario represents re-development
    public int siteSuitability; //0 - Site suitability poor, 1 - moderate, 2 - excellent
     */
    Date date = new Date();
    private Long timeStamp = date.getTime(); //Default to current timestamp

    // Simulation variables
    private Integer errorCode;
    private Integer startYear;
    private Integer endYear;
    private Boolean includePostDev;

    // Site data
    private String name;
    private Integer soilGroup;
    //hydConductivity in UI
    //private Double soilKsat;
    private Double[] landCover;
    private Integer slopeIndex;
    private Double pathLength;
    //rainsource - private Integer rainSourceIndex;
    //evapsource - private Integer evapSourceIndex;

    // File variables
    //private String tmpPath;      // Temporary file folder
    private String rainFile;    //Constants.FILE_PATH_RAIN + Constants.FILE_EXT_DAT;     // Rainfall data file
    private String inpFile = Constants.FILE_PATH_INPUT + "_" + getTimeStamp() + Constants.FILE_EXT_INP;      // Complete SWMM input file
    private String inpFileBase = Constants.FILE_PATH_INPUT_BASE + "_" + getTimeStamp() + Constants.FILE_EXT_INP;     // Base SWMM input file
    private String rptFile = Constants.FILE_PATH_RPT + "_" + getTimeStamp() + Constants.FILE_EXT_RPT;      // SWMM status report file
    private String outFile = Constants.FILE_PATH_OUTPUT + "_" + getTimeStamp() + Constants.FILE_EXT_OUT;      // SWMM binary results file

    // Subcatchment areas
    private Double fracImperv;    // Total imperv. area fraction
    private Double area1;         // Main subcatchment area
    private Double area2;         // Imperv. disconnection area
    private Double area3;         // Infil. basin source area
    private Double area4;         // Water harvesting source area
    private Double impervArea1;   // Main subcatch. imperv. area
    private Double pervArea1;     // Main subcatch. pervious area

    // Areas treated by LIDs
    private Double fracImpDiscon;
    private Double fracRainGarden;
    private Double fracGreenRoof;
    private Double fracPorousPave;
    private Double fracRainHarvest;
    private Double fracStreetPlanter;
    private Double fracInfilBasin;

    private Double totalLIDAreaFrac;  // cost Module addition sum of all LID areas fraction - no costs if 0

    // Areas devoted to LIDs
    private Double idImpervArea;  // Impervious area disconnected
    private Double idPervArea;    // Pervious area receiving disconnected area
    private Double ibImpervArea;  // Impervious area to Infil. Basin
    private Double ibPervArea;    // Infil. Basin area
    private Double rhImpervArea;  // Rain harvesting impervious area
    private Double rgArea;        // Rain Garden area
    private Double grArea;        // Green Roof area
    private Double spArea;        // Street Planter area
    private Double ppArea;        // Porous Pavement area

    //cost module additions
    //siteModel - private Boolean isNewDevelopment; //true if scenario represents new development
    //siteModel -  private Boolean isReDevelopment; //true if scenario represents re-development
    private Integer siteSuitability; //0 - Site suitability poor, 1 - moderate, 2 - excellent    
    // Indexes of climate change option
    //climateScenario - public Integer climateScenarioIndex;
    //climateYear - public Integer climateYear;

    ClimateModel climateModel = new ClimateModel();
    LidModel lidModel = new LidModel();
    RunoffModel runoffModel = new RunoffModel();
    XEventModel xEventModel = new XEventModel();

    public SiteData() {
        name = "";
        Integer n = (Integer) LandCovers.COUNT.getValue();
        landCover = new Double[n];
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public Boolean getIncludePostDev() {
        return includePostDev;
    }

    public void setIncludePostDev(Boolean includePostDev) {
        this.includePostDev = includePostDev;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSoilGroup() {
        return soilGroup;
    }

    public void setSoilGroup(Integer soilGroup) {
        this.soilGroup = soilGroup;
    }

/*    
    public Double getSoilKsat() {
        return soilKsat;
    }

    public void setSoilKsat(Double soilKsat) {
        this.soilKsat = soilKsat;
    }
*/
    public Double[] getLandCover() {
        return landCover;
    }

    public void setLandCover(Double[] landCover) {
        this.landCover = landCover;
    }

    public Integer getSlopeIndex() {
        return slopeIndex;
    }

    public void setSlopeIndex(Integer slopeIndex) {
        this.slopeIndex = slopeIndex;
    }

    public Double getPathLength() {
        return pathLength;
    }

    public void setPathLength(Double pathLength) {
        this.pathLength = pathLength;
    }

    /*
    public String getTmpPath() {
        return tmpPath;
    }

    public void setTmpPath(String tmpPath) {
        this.tmpPath = tmpPath;
    }
     */

    public String getRainFile() {
        return rainFile;
    }

    public void setRainFile(String rainFile) {
        this.rainFile = rainFile;
    }

    
    public String getInpFile() {
        return inpFile;
    }

    public void setInpFile(String inpFile) {
        this.inpFile = inpFile;
    }

    public String getInpFileBase() {
        return inpFileBase;
    }

    public void setInpFileBase(String inpFileBase) {
        this.inpFileBase = inpFileBase;
    }

    public String getRptFile() {
        return rptFile;
    }

    public void setRptFile(String rptFile) {
        this.rptFile = rptFile;
    }

    public String getOutFile() {
        return outFile;
    }

    public void setOutFile(String outFile) {
        this.outFile = outFile;
    }

    public Double getFracImperv() {
        return fracImperv;
    }

    public void setFracImperv(Double fracImperv) {
        this.fracImperv = fracImperv;
    }

    public Double getArea1() {
        return area1;
    }

    public void setArea1(Double area1) {
        this.area1 = area1;
    }

    public Double getArea2() {
        return area2;
    }

    public void setArea2(Double area2) {
        this.area2 = area2;
    }

    public Double getArea3() {
        return area3;
    }

    public void setArea3(Double area3) {
        this.area3 = area3;
    }

    public Double getArea4() {
        return area4;
    }

    public void setArea4(Double area4) {
        this.area4 = area4;
    }

    public Double getImpervArea1() {
        return impervArea1;
    }

    public void setImpervArea1(Double impervArea1) {
        this.impervArea1 = impervArea1;
    }

    public Double getPervArea1() {
        return pervArea1;
    }

    public void setPervArea1(Double pervArea1) {
        this.pervArea1 = pervArea1;
    }

    public Double getFracImpDiscon() {
        return fracImpDiscon;
    }

    public void setFracImpDiscon(Double fracImpDiscon) {
        this.fracImpDiscon = fracImpDiscon;
    }

    public Double getFracRainGarden() {
        return fracRainGarden;
    }

    public void setFracRainGarden(Double fracRainGarden) {
        this.fracRainGarden = fracRainGarden;
    }

    public Double getFracGreenRoof() {
        return fracGreenRoof;
    }

    public void setFracGreenRoof(Double fracGreenRoof) {
        this.fracGreenRoof = fracGreenRoof;
    }

    public Double getFracPorousPave() {
        return fracPorousPave;
    }

    public void setFracPorousPave(Double fracPorousPave) {
        this.fracPorousPave = fracPorousPave;
    }

    public Double getFracRainHarvest() {
        return fracRainHarvest;
    }

    public void setFracRainHarvest(Double fracRainHarvest) {
        this.fracRainHarvest = fracRainHarvest;
    }

    public Double getFracStreetPlanter() {
        return fracStreetPlanter;
    }

    public void setFracStreetPlanter(Double fracStreetPlanter) {
        this.fracStreetPlanter = fracStreetPlanter;
    }

    public Double getFracInfilBasin() {
        return fracInfilBasin;
    }

    public void setFracInfilBasin(Double fracInfilBasin) {
        this.fracInfilBasin = fracInfilBasin;
    }

    public Double getTotalLIDAreaFrac() {
        return totalLIDAreaFrac;
    }

    public void setTotalLIDAreaFrac(Double totalLIDAreaFrac) {
        this.totalLIDAreaFrac = totalLIDAreaFrac;
    }

    public Double getIdImpervArea() {
        return idImpervArea;
    }

    public void setIdImpervArea(Double idImpervArea) {
        this.idImpervArea = idImpervArea;
    }

    public Double getIdPervArea() {
        return idPervArea;
    }

    public void setIdPervArea(Double idPervArea) {
        this.idPervArea = idPervArea;
    }

    public Double getIbImpervArea() {
        return ibImpervArea;
    }

    public void setIbImpervArea(Double ibImpervArea) {
        this.ibImpervArea = ibImpervArea;
    }

    public Double getIbPervArea() {
        return ibPervArea;
    }

    public void setIbPervArea(Double ibPervArea) {
        this.ibPervArea = ibPervArea;
    }

    public Double getRhImpervArea() {
        return rhImpervArea;
    }

    public void setRhImpervArea(Double rhImpervArea) {
        this.rhImpervArea = rhImpervArea;
    }

    public Double getRgArea() {
        return rgArea;
    }

    public void setRgArea(Double rgArea) {
        this.rgArea = rgArea;
    }

    public Double getGrArea() {
        return grArea;
    }

    public void setGrArea(Double grArea) {
        this.grArea = grArea;
    }

    public Double getSpArea() {
        return spArea;
    }

    public void setSpArea(Double spArea) {
        this.spArea = spArea;
    }

    public Double getPpArea() {
        return ppArea;
    }

    public void setPpArea(Double ppArea) {
        this.ppArea = ppArea;
    }

    public Integer getSiteSuitability() {
        return siteSuitability;
    }

    public void setSiteSuitability(Integer siteSuitability) {
        this.siteSuitability = siteSuitability;
    }

    public ClimateModel getClimateModel() {
        return climateModel;
    }

    public void setClimateModel(ClimateModel climateModel) {
        this.climateModel = climateModel;
    }

    public RunoffModel getRunoffModel() {
        return runoffModel;
    }

    public void setRunoffModel(RunoffModel runoffModel) {
        this.runoffModel = runoffModel;
    }

    public LidModel getLidModel() {
        return lidModel;
    }

    public void setLidModel(LidModel lidModel) {
        this.lidModel = lidModel;
    }
    
    public XEventModel getXEventModel() {
        return xEventModel;
    }

    public void setXEventModel(XEventModel xEventModel) {
        this.xEventModel = xEventModel;
    }    

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
