/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN This contains all siteData coming in from request (front
 * end)
 */
@XmlRootElement(name = "siteData")
@XmlAccessorType(XmlAccessType.PROPERTY)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SiteDataModel {

    private String version;
    private String siteName;
    private String siteLocation;
    private Double siteArea;
    private String hydSoilGroup;
    private Double soilKsat;    //private Double hydConductivity; - XML element is hydConductivity
    private Integer surfaceSlope;
    private Integer rainSource;
    private Integer evapSource;
    private Double percForest;
    private Double percMeadow;
    private Double percLawn;
    private Double percDesert;
    private Double percImpervious;
    private Double percDisconnection;
    //lidmodel.idcapture private Integer disconnectionCaptureRatio;
    private Integer disconnectionCaptureRatio;
    private Double percHarvesting;

    private Integer harvestingCisternSize;
    private Integer harvestingCisternNumber;
    private Integer harvestingEmptyingRate;

    private Double percRainGardens;

    private Integer rainGardensPondingHeight;
    private Integer rainGardensSoilThickness;
    private Integer rainGardensSoilKsat;
    private Integer rainGardensCaptureRatio;

    private Double percGreenRoofs;

    private Integer greenRoofsSoilThickness;
    private Integer greenRoofsSoilKsat;

    private Double percStreetPlanters;

    private Integer streetPlantersPondingHeight;
    private Integer streetPlantersSoilThickness;
    private Integer streetPlantersSoilKsat;
    private Integer streetPlantersGravelThickness;
    private Integer streetPlantersCaptureRatio;

    private Double percInfilBasin;

    private Integer infilBasinBasinDepth;
    private Integer infilBasinCaptureRatio;

    private Double percPorousPavement;

    private Integer porousPavementPavementThickness;
    private Integer porousPavementgravelThickness;
    private Integer porousPavementcaptureRatio;

    private Double designStorm;
    private Integer yearsAnalyzed;
    private Double runoffThreshold = 0.10;
    private Boolean ignoreConsecStorms; //from UI Results tab Ignore Consecutive Days
    private Integer climateScenario;
    private Integer climateYear;

    private LidModel lidModel = new LidModel();

    //New Cost Module
    private Boolean isNewDevelopment;
    private Boolean isReDevelopment;
    private Boolean siteSuitabilityPoor;
    private Boolean siteSuitabilityModerate;
    private Boolean siteSuitabilityExcellent;
    private Boolean rgPretreatment;
    private Boolean ibPretreatment;
    private Boolean ppPretreatment;
    private Integer cmbCostRegion;
    private Double tbRegMultiplier;

    //Hold MET station IDs
    private String precStationID;
    private String evapStationID;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }


    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getSiteLocation() {
        return siteLocation;
    }

    public void setSiteLocation(String siteLocation) {
        this.siteLocation = siteLocation;
    }

    public Double getSiteArea() {
        return siteArea;
    }

    public void setSiteArea(Double siteArea) {
        this.siteArea = siteArea;
    }

    public String getHydSoilGroup() {
        return hydSoilGroup;
    }

    public void setHydSoilGroup(String hydSoilGroup) {
        this.hydSoilGroup = hydSoilGroup;
    }
    
    @XmlElement(name="hydConductivity")
    public Double getSoilKsat() {
        return soilKsat;
    }

    public void setSoilKsat(Double soilKsat) {
        this.soilKsat = soilKsat;
    }
    
/*    
    public Double getHydConductivity() {
        return hydConductivity;
    }

    public void setHydConductivity(Double hydConductivity) {
        this.hydConductivity = hydConductivity;
    }
*/
    
    public Integer getSurfaceSlope() {
        return surfaceSlope;
    }

    public void setSurfaceSlope(Integer surfaceSlope) {
        this.surfaceSlope = surfaceSlope;
    }

    public Integer getRainSource() {
        return rainSource;
    }

    public void setRainSource(Integer rainSource) {
        this.rainSource = rainSource;
    }

    public Integer getEvapSource() {
        return evapSource;
    }

    public void setEvapSource(Integer evapSource) {
        this.evapSource = evapSource;
    }

    public Double getPercForest() {
        return percForest;
    }

    public void setPercForest(Double percForest) {
        this.percForest = percForest;
    }

    public Double getPercMeadow() {
        return percMeadow;
    }

    public void setPercMeadow(Double percMeadow) {
        this.percMeadow = percMeadow;
    }

    public Double getPercLawn() {
        return percLawn;
    }

    public void setPercLawn(Double percLawn) {
        this.percLawn = percLawn;
    }

    public Double getPercDesert() {
        return percDesert;
    }

    public void setPercDesert(Double percDesert) {
        this.percDesert = percDesert;
    }

    public Double getPercImpervious() {
        return percImpervious;
    }

    public void setPercImpervious(Double percImpervious) {
        this.percImpervious = percImpervious;
    }

    public Double getPercDisconnection() {
        return percDisconnection;
    }

    public void setPercDisconnection(Double percDisconnection) {
        this.percDisconnection = percDisconnection;
    }

  // moved to lidmodel.idcapture
    public Integer getDisconnectionCaptureRatio() {
        return disconnectionCaptureRatio;
    }

    public void setDisconnectionCaptureRatio(Integer disconnectionCaptureRatio) {
        this.disconnectionCaptureRatio = disconnectionCaptureRatio;
    }

    public Double getPercHarvesting() {
        return percHarvesting;
    }

    public void setPercHarvesting(Double percHarvesting) {
        this.percHarvesting = percHarvesting;
    }


    public Integer getHarvestingCisternSize() {
        return harvestingCisternSize;
    }

    public void setHarvestingCisternSize(Integer harvestingCisternSize) {
        this.harvestingCisternSize = harvestingCisternSize;
    }

    public Integer getHarvestingCisternNumber() {
        return harvestingCisternNumber;
    }

    public void setHarvestingCisternNumber(Integer harvestingCisternNumber) {
        this.harvestingCisternNumber = harvestingCisternNumber;
    }

    public Integer getHarvestingEmptyingRate() {
        return harvestingEmptyingRate;
    }

    public void setHarvestingEmptyingRate(Integer harvestingEmptyingRate) {
        this.harvestingEmptyingRate = harvestingEmptyingRate;
    }

    public Double getPercRainGardens() {
        return percRainGardens;
    }

    public void setPercRainGardens(Double percRainGardens) {
        this.percRainGardens = percRainGardens;
    }


    public Integer getRainGardensPondingHeight() {
        return rainGardensPondingHeight;
    }

    public void setRainGardensPondingHeight(Integer rainGardensPondingHeight) {
        this.rainGardensPondingHeight = rainGardensPondingHeight;
    }

    public Integer getRainGardensSoilThickness() {
        return rainGardensSoilThickness;
    }

    public void setRainGardensSoilThickness(Integer rainGardensSoilThickness) {
        this.rainGardensSoilThickness = rainGardensSoilThickness;
    }

    public Integer getRainGardensSoilKsat() {
        return rainGardensSoilKsat;
    }

    public void setRainGardensSoilKsat(Integer rainGardensSoilKsat) {
        this.rainGardensSoilKsat = rainGardensSoilKsat;
    }

    public Integer getRainGardensCaptureRatio() {
        return rainGardensCaptureRatio;
    }

    public void setRainGardensCaptureRatio(Integer rainGardensCaptureRatio) {
        this.rainGardensCaptureRatio = rainGardensCaptureRatio;
    }

    public Double getPercGreenRoofs() {
        return percGreenRoofs;
    }

    public void setPercGreenRoofs(Double percGreenRoofs) {
        this.percGreenRoofs = percGreenRoofs;
    }


    public Integer getGreenRoofSoilThickness() {
        return greenRoofsSoilThickness;
    }

    public void setGreenRoofSoilThickness(Integer greenRoofsSoilThickness) {
        this.greenRoofsSoilThickness = greenRoofsSoilThickness;
    }

    public Integer getGreenRoofSoilKsat() {
        return greenRoofsSoilKsat;
    }

    public void setGreenRoofSoilKsat(Integer greenRoofsSoilKsat) {
        this.greenRoofsSoilKsat = greenRoofsSoilKsat;
    }

    public Double getPercStreetPlanters() {
        return percStreetPlanters;
    }

    public void setPercStreetPlanters(Double percStreetPlanters) {
        this.percStreetPlanters = percStreetPlanters;
    }


    public Integer getStreetPlantersPondingHeight() {
        return streetPlantersPondingHeight;
    }

    public void setStreetPlantersPondingHeight(Integer streetPlantersPondingHeight) {
        this.streetPlantersPondingHeight = streetPlantersPondingHeight;
    }

    public Integer getStreetPlantersSoilThickness() {
        return streetPlantersSoilThickness;
    }

    public void setStreetPlantersSoilThickness(Integer streetPlantersSoilThickness) {
        this.streetPlantersSoilThickness = streetPlantersSoilThickness;
    }

    public Integer getStreetPlantersSoilKsat() {
        return streetPlantersSoilKsat;
    }

    public void setStreetPlantersSoilKsat(Integer streetPlantersSoilKsat) {
        this.streetPlantersSoilKsat = streetPlantersSoilKsat;
    }

    public Integer getStreetPlantersGravelThickness() {
        return streetPlantersGravelThickness;
    }

    public void setStreetPlantersGravelThickness(Integer streetPlantersGravelThickness) {
        this.streetPlantersGravelThickness = streetPlantersGravelThickness;
    }

    public Integer getStreetPlantersCaptureRatio() {
        return streetPlantersCaptureRatio;
    }

    public void setStreetPlantersCaptureRatio(Integer streetPlantersCaptureRatio) {
        this.streetPlantersCaptureRatio = streetPlantersCaptureRatio;
    }

    public Double getPercInfilBasin() {
        return percInfilBasin;
    }

    public void setPercInfilBasin(Double percInfilBasin) {
        this.percInfilBasin = percInfilBasin;
    }


    public Integer getInfilBasinBasinDepth() {
        return infilBasinBasinDepth;
    }

    public void setInfilBasinBasinDepth(Integer infilBasinBasinDepth) {
        this.infilBasinBasinDepth = infilBasinBasinDepth;
    }

    public Integer getInfilBasinCaptureRatio() {
        return infilBasinCaptureRatio;
    }

    public void setInfilBasinCaptureRatio(Integer infilBasinCaptureRatio) {
        this.infilBasinCaptureRatio = infilBasinCaptureRatio;
    }

    public Double getPercPorousPavement() {
        return percPorousPavement;
    }

    public void setPercPorousPavement(Double percPorousPavement) {
        this.percPorousPavement = percPorousPavement;
    }


    public Integer getPorousPavementPavementThickness() {
        return porousPavementPavementThickness;
    }

    public void setPorousPavementPavementThickness(Integer porousPavementPavementThickness) {
        this.porousPavementPavementThickness = porousPavementPavementThickness;
    }

    public Integer getPorousPavementGravelThickness() {
        return porousPavementgravelThickness;
    }

    public void setPorousPavementGravelThickness(Integer porousPavementgravelThickness) {
        this.porousPavementgravelThickness = porousPavementgravelThickness;
    }

    public Integer getPorousPavementCaptureRatio() {
        return porousPavementcaptureRatio;
    }

    public void setPorousPavementCaptureRatio(Integer porousPavementcaptureRatio) {
        this.porousPavementcaptureRatio = porousPavementcaptureRatio;
    }

    public Double getDesignStorm() {
        return designStorm;
    }

    public void setDesignStorm(Double designStorm) {
        this.designStorm = designStorm;
    }

    public Integer getYearsAnalyzed() {
        return yearsAnalyzed;
    }

    public void setYearsAnalyzed(Integer yearsAnalyzed) {
        this.yearsAnalyzed = yearsAnalyzed;
    }

    public Double getRunoffThreshold() {
        return runoffThreshold;
    }

    public void setRunoffThreshold(Double runoffThreshold) {
        this.runoffThreshold = runoffThreshold;
    }

    public Boolean getIgnoreConsecStorms() {
        return ignoreConsecStorms;
    }

    public void setIgnoreConsecStorms(Boolean ignoreConsecStorms) {
        this.ignoreConsecStorms = ignoreConsecStorms;
    }

    public Integer getClimateScenario() {
        return climateScenario;
    }

    public void setClimateScenario(Integer climateScenario) {
        this.climateScenario = climateScenario;
    }

    public Integer getClimateYear() {
        return climateYear;
    }

    public void setClimateYear(Integer climateYear) {
        this.climateYear = climateYear;
    }

    @XmlElement(name = "lidData")
    public LidModel getLidModel() {
        return lidModel;
    }

    public void setLidModel(LidModel lidModel) {

        this.lidModel = lidModel;
        System.out.println("Site Data Model " + lidModel.getGrSoilHeight());
    }

    public Boolean getIsNewDevelopment() {
        return isNewDevelopment;
    }

    public void setIsNewDevelopment(Boolean isNewDevelopment) {
        this.isNewDevelopment = isNewDevelopment;
    }

    public Boolean getIsReDevelopment() {
        return isReDevelopment;
    }

    public void setIsReDevelopment(Boolean isReDevelopment) {
        this.isReDevelopment = isReDevelopment;
    }

    public Boolean getSiteSuitabilityPoor() {
        return siteSuitabilityPoor;
    }

    public void setSiteSuitabilityPoor(Boolean siteSuitabilityPoor) {
        this.siteSuitabilityPoor = siteSuitabilityPoor;
    }

    public Boolean getSiteSuitabilityModerate() {
        return siteSuitabilityModerate;
    }

    public void setSiteSuitabilityModerate(Boolean siteSuitabilityModerate) {
        this.siteSuitabilityModerate = siteSuitabilityModerate;
    }

    public Boolean getSiteSuitabilityExcellent() {
        return siteSuitabilityExcellent;
    }

    public void setSiteSuitabilityExcellent(Boolean siteSuitabilityExcellent) {
        this.siteSuitabilityExcellent = siteSuitabilityExcellent;
    }

    public Boolean getRgPretreatment() {
        return rgPretreatment;
    }

    public void setRgPretreatment(Boolean rgPretreatment) {
        this.rgPretreatment = rgPretreatment;
    }

    public Boolean getIbPretreatment() {
        return ibPretreatment;
    }

    public void setIbPretreatment(Boolean ibPretreatment) {
        this.ibPretreatment = ibPretreatment;
    }

    public Boolean getPpPretreatment() {
        return ppPretreatment;
    }

    public void setPpPretreatment(Boolean ppPretreatment) {
        this.ppPretreatment = ppPretreatment;
    }

    public Integer getCmbCostRegion() {
        return cmbCostRegion;
    }

    public void setCmbCostRegion(Integer cmbCostRegion) {
        this.cmbCostRegion = cmbCostRegion;
    }

    public Double getTbRegMultiplier() {
        return tbRegMultiplier;
    }

    public void setTbRegMultiplier(Double tbRegMultiplier) {
        this.tbRegMultiplier = tbRegMultiplier;
    }

    public String getPrecStationID() {
        return precStationID;
    }

    public void setPrecStationID(String precStationID) {
        this.precStationID = precStationID;
    }

    public String getEvapStationID() {
        return evapStationID;
    }

    public void setEvapStationID(String evapStationID) {
        this.evapStationID = evapStationID;
    }

}
