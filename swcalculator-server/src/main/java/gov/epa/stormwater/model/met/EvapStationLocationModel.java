/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.met;

import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class EvapStationLocationModel {

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
    private Double yrCount;
    private Double value;
    private Double sum;
    private Double jan;
    private Double feb;
    private Double mar;
    private Double apr;
    private Double may;
    private Double jun;
    private Double jul;
    private Double aug;
    private Double sep;
    private Double oct;
    private Double nov;
    private Double dec;

    private String staNam;

    public EvapStationLocationModel() {
    }

    public EvapStationLocationModel(
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
            Double yrCount,
            Double value,
            Double sum,
            Double jan,
            Double feb,
            Double mar,
            Double apr,
            Double may,
            Double jun,
            Double jul,
            Double aug,
            Double sep,
            Double oct,
            Double nov,
            Double dec,
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
        this.yrCount = yrCount;
        this.value = value;
        this.sum = sum;
        this.jan = jan;
        this.feb = feb;
        this.mar = mar;
        this.apr = apr;
        this.may = may;
        this.jun = jun;
        this.jul = jul;
        this.aug = aug;
        this.sep = sep;
        this.oct = oct;
        this.nov = nov;
        this.dec = dec;
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
        return yrCount;
    }

    public void setYrCount(Double yrCount) {
        this.yrCount = yrCount;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public Double getJan() {
        return jan;
    }

    public void setJan(Double jan) {
        this.jan = jan;
    }

    public Double getFeb() {
        return feb;
    }

    public void setFeb(Double feb) {
        this.feb = feb;
    }

    public Double getMar() {
        return mar;
    }

    public void setMar(Double mar) {
        this.mar = mar;
    }

    public Double getApr() {
        return apr;
    }

    public void setApr(Double apr) {
        this.apr = apr;
    }

    public Double getMay() {
        return may;
    }

    public void setMay(Double may) {
        this.may = may;
    }

    public Double getJun() {
        return jun;
    }

    public void setJun(Double jun) {
        this.jun = jun;
    }

    public Double getJul() {
        return jul;
    }

    public void setJul(Double jul) {
        this.jul = jul;
    }

    public Double getAug() {
        return aug;
    }

    public void setAug(Double aug) {
        this.aug = aug;
    }

    public Double getSep() {
        return sep;
    }

    public void setSep(Double sep) {
        this.sep = sep;
    }

    public Double getOct() {
        return oct;
    }

    public void setOct(Double oct) {
        this.oct = oct;
    }

    public Double getNov() {
        return nov;
    }

    public void setNov(Double nov) {
        this.nov = nov;
    }

    public Double getDec() {
        return dec;
    }

    public void setDec(Double dec) {
        this.dec = dec;
    }

    public String getStaNam() {
        return staNam;
    }

    public void setStaNam(String staNam) {
        this.staNam = staNam;
    }

}
