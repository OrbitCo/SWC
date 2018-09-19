/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.bls;

import com.fasterxml.jackson.annotation.JsonProperty;
import gov.epa.stormwater.model.BaseModel;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
//public class BlsCenterModel extends BaseModel implements Comparable<BlsCenterModel> {
public class BlsCenterModel extends BaseModel {

    private Integer dataYear;
    private Double inflationFactor;
    private Double regModel2014Index;
    private String blsSeriesID;
    private String state;
    private String blsCity;
    private Double regionalFactor;
    private Double latitude;
    private Double longitude;
    private Double distToCurrentPoint;
    private String geoID;
    private String blsReadyMixConcID;
    private String blsTractorShovelLoadersID;
    private String blsEnergyID;
    private String blsFuelsUtilitiesID;
    private String selectString;

    public double c0_intercept;
    public double c1_readyMix;
    public double c2_tractorShovel;
    public double c3_energy;
    public double c4_fuelUtils;

    /*
    @Override
    public int compareTo(BlsCenterModel o) {
        // usually toString should not be used,
        // instead one of the attributes or more in a comparator chain        
        //return toString().compareTo(o.toString());int compareQuantity = ((Fruit) compareFruit).getQuantity();
        double compareDistToCurrentPoint = ((BlsCenterModel) o).getDistToCurrentPoint();

        //ascending order
        return (int) (this.distToCurrentPoint - compareDistToCurrentPoint);

        //descending order
        //return compareQuantity - this.quantity;
    }
     */
    public Integer getDataYear() {
        return dataYear;
    }

    public void setDataYear(Integer dataYear) {
        this.dataYear = dataYear;
    }

    public Double getInflationFactor() {
        return inflationFactor;
    }

    public void setInflationFactor(Double inflationFactor) {
        this.inflationFactor = inflationFactor;
    }

    @JsonProperty("regModel2014Index")
    public Double getRegModel2014Index() {
        return regModel2014Index;
    }

    public void setRegModel2014Index(Double regModel2014Index) {
        this.regModel2014Index = regModel2014Index;
    }

    @JsonProperty("BLSSeriesID")
    public String getBlsSeriesID() {
        return blsSeriesID;
    }

    public void setBlsSeriesID(String blsSeriesID) {
        this.blsSeriesID = blsSeriesID;
    }

    @JsonProperty("State")
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @JsonProperty("blsCity")
    public String getBlsCity() {
        return blsCity;
    }

    public void setBlsCity(String blsCity) {
        this.blsCity = blsCity;
    }

    @JsonProperty("regionalFactor")
    public Double getRegionalFactor() {
        return regionalFactor;
    }

    public void setRegionalFactor(Double regionalFactor) {
        this.regionalFactor = regionalFactor;
    }

    @JsonProperty("latitude")
    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    @JsonProperty("longitude")
    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getDistToCurrentPoint() {
        return distToCurrentPoint;
    }

    public void setDistToCurrentPoint(Double distToCurrentPoint) {
        this.distToCurrentPoint = distToCurrentPoint;
    }

    @JsonProperty("GEOID")
    public String getGeoID() {
        return geoID;
    }

    public void setGeoID(String geoID) {
        this.geoID = geoID;
    }

    @JsonProperty("blsReadyMixConcID")
    public String getBlsReadyMixConcID() {
        return blsReadyMixConcID;
    }

    public void setBlsReadyMixConcID(String blsReadyMixConcID) {
        this.blsReadyMixConcID = blsReadyMixConcID;
    }

    @JsonProperty("blsTractorShovelLoadersID")
    public String getBlsTractorShovelLoadersID() {
        return blsTractorShovelLoadersID;
    }

    public void setBlsTractorShovelLoadersID(String blsTractorShovelLoadersID) {
        this.blsTractorShovelLoadersID = blsTractorShovelLoadersID;
    }

    @JsonProperty("blsEnergyID")
    public String getBlsEnergyID() {
        return blsEnergyID;
    }

    public void setBlsEnergyID(String blsEnergyID) {
        this.blsEnergyID = blsEnergyID;
    }

    @JsonProperty("blsFuelsUtilitiesID")
    public String getBlsFuelsUtilitiesID() {
        return blsFuelsUtilitiesID;
    }

    public void setBlsFuelsUtilitiesID(String blsFuelsUtilitiesID) {
        this.blsFuelsUtilitiesID = blsFuelsUtilitiesID;
    }


    public String getSelectString() {
        return selectString;
    }

    public void setSelectString(String selectString) {
        this.selectString = selectString;
    }

    @JsonProperty("c0_intercept")
    public Double getC0_intercept() {
        return c0_intercept;
    }

    public void setC0_intercept(Double c0_intercept) {
        this.c0_intercept = c0_intercept;
    }

    @JsonProperty("c1_readyMix")
    public Double getC1_readyMix() {
        return c1_readyMix;
    }

    public void setC1_readyMix(Double c1_readyMix) {
        this.c1_readyMix = c1_readyMix;
    }

    @JsonProperty("c2_tractorShovel")
    public Double getC2_tractorShovel() {
        return c2_tractorShovel;
    }

    public void setC2_tractorShovel(Double c2_tractorShovel) {
        this.c2_tractorShovel = c2_tractorShovel;
    }

    @JsonProperty("c3_energy")
    public Double getC3_energy() {
        return c3_energy;
    }

    public void setC3_energy(Double c3_energy) {
        this.c3_energy = c3_energy;
    }

    @JsonProperty("c4_fuelUtils")
    public Double getC4_fuelUtils(){
        return c4_fuelUtils;
    }

    public void setC4_fuelUtils(Double c4_fuelUtils) {
        this.c4_fuelUtils = c4_fuelUtils;
    }
}
