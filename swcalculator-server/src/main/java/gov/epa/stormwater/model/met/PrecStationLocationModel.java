/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.met;

import gov.epa.stormwater.model.*;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class PrecStationLocationModel {

    private String stationId;
    private String dataType;
    private String fileName;
    private Integer id;
    private Double lat;
    private Double longitude;
    private String scenario;
    private String constituent;
    private String sDate;
    private String eDate;
    private Double rrCount;
    private Double value;
    private String staNam;

    public PrecStationLocationModel() {
    }

    public PrecStationLocationModel(
            String stationId,
            String dataType,
            String fileName,
            Integer id,
            Double lat,
            Double longitude,
            String scenario,
            String constituent,
            String sDate,
            String eDate,
            Double rrCount,
            Double value,
            String staNam
    ) {
        this.stationId = stationId;
        this.dataType = dataType;
        this.fileName = fileName;
        this.id = id;
        this.lat = lat;
        this.longitude = longitude;
        this.scenario = scenario;
        this.constituent = constituent;
        this.sDate = sDate;
        this.eDate = eDate;
        this.rrCount = rrCount;
        this.value = value;
        this.staNam = staNam;
    }

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getScenario() {
        return scenario;
    }

    public void setScenario(String scenario) {
        this.scenario = scenario;
    }

    public String getConstituent() {
        return constituent;
    }

    public void setConstituent(String constituent) {
        this.constituent = constituent;
    }

    public String getSDate() {
        return sDate;
    }

    public void setSDate(String sDate) {
        this.sDate = sDate;
    }

    public String getEDate() {
        return eDate;
    }

    public void setEDate(String eDate) {
        this.eDate = eDate;
    }

    public Double getYrCount() {
        return rrCount;
    }

    public void setYrCount(Double rrCount) {
        this.rrCount = rrCount;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getStaNam() {
        return staNam;
    }

    public void setStaNam(String staNam) {
        this.staNam = staNam;
    }

}
