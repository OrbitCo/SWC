package gov.epa.stormwater.model.hms;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HmsResponseMetadata {
    @JsonProperty("nldas_prod_name")
    private String prodName;

    @JsonProperty("nldas_param_short_name")
    private String paramShortName;

    @JsonProperty("nldas_param_name")
    private String paramName;

    @JsonProperty("nldas_unit")
    private String unit;

    @JsonProperty("nldas_undef")
    private String undef;

    @JsonProperty("nldas_begin_time")
    private String beginTime;

    @JsonProperty("nldas_end_time")
    private String endTime;

    @JsonProperty("nldas_time_interval[hour]")
    private String timeInterval;

    @JsonProperty("nldas_tot_record")
    private String totRecord;

    @JsonProperty("nldas_grid_y")
    private String gridY;

    @JsonProperty("nldas_grid_x")
    private String gridX;

    @JsonProperty("nldas_elevation[m]")
    private String elevation;

    @JsonProperty("nldas_dlat")
    private String dlat;

    @JsonProperty("nldas_dlon")
    private String dlon;

    @JsonProperty("nldas_ydim(original data set)")
    private String ydim;

    @JsonProperty("nldas_xdim(original data set)")
    private String xdim;

    @JsonProperty("nldas_start_lat(original data set)")
    private String startLat;

    @JsonProperty("nldas_start_lon(original data set)")
    private String startLon;

    @JsonProperty("nldas_Last_update")
    private String lastUpdate;

    @JsonProperty("nldas_begin_time_index")
    private String beginTimeIndex;

    @JsonProperty("nldas_end_time_index")
    private String endTimeIndex;

    @JsonProperty("nldas_lat")
    private String lat;

    @JsonProperty("nldas_lon")
    private String lon;

    @JsonProperty("nldas_Request_time")
    private String requestTime;

    @JsonProperty("nldas_temporalresolution")
    private String temporalResolution;

    @JsonProperty("column_1")
    private String column1;

    @JsonProperty("column_2")
    private String column2;

    @JsonProperty("nldas_timeZone")
    private String timezone;

    @JsonProperty("nldas_tz_offset")
    private String tzOffset;

    @JsonProperty("request_url")
    private String requestUrl;

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getParamShortName() {
        return paramShortName;
    }

    public void setParamShortName(String paramShortName) {
        this.paramShortName = paramShortName;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getUndef() {
        return undef;
    }

    public void setUndef(String undef) {
        this.undef = undef;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getTimeInterval() {
        return timeInterval;
    }

    public void setTimeInterval(String timeInterval) {
        this.timeInterval = timeInterval;
    }

    public String getTotRecord() {
        return totRecord;
    }

    public void setTotRecord(String totRecord) {
        this.totRecord = totRecord;
    }

    public String getGridY() {
        return gridY;
    }

    public void setGridY(String gridY) {
        this.gridY = gridY;
    }

    public String getGridX() {
        return gridX;
    }

    public void setGridX(String gridX) {
        this.gridX = gridX;
    }

    public String getElevation() {
        return elevation;
    }

    public void setElevation(String elevation) {
        this.elevation = elevation;
    }

    public String getDlat() {
        return dlat;
    }

    public void setDlat(String dlat) {
        this.dlat = dlat;
    }

    public String getDlon() {
        return dlon;
    }

    public void setDlon(String dlon) {
        this.dlon = dlon;
    }

    public String getYdim() {
        return ydim;
    }

    public void setYdim(String ydim) {
        this.ydim = ydim;
    }

    public String getXdim() {
        return xdim;
    }

    public void setXdim(String xdim) {
        this.xdim = xdim;
    }

    public String getStartLat() {
        return startLat;
    }

    public void setStartLat(String startLat) {
        this.startLat = startLat;
    }

    public String getStartLon() {
        return startLon;
    }

    public void setStartLon(String startLon) {
        this.startLon = startLon;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getBeginTimeIndex() {
        return beginTimeIndex;
    }

    public void setBeginTimeIndex(String beginTimeIndex) {
        this.beginTimeIndex = beginTimeIndex;
    }

    public String getEndTimeIndex() {
        return endTimeIndex;
    }

    public void setEndTimeIndex(String endTimeIndex) {
        this.endTimeIndex = endTimeIndex;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public String getTemporalResolution() {
        return temporalResolution;
    }

    public void setTemporalResolution(String temporalResolution) {
        this.temporalResolution = temporalResolution;
    }

    public String getColumn1() {
        return column1;
    }

    public void setColumn1(String column1) {
        this.column1 = column1;
    }

    public String getColumn2() {
        return column2;
    }

    public void setColumn2(String column2) {
        this.column2 = column2;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getTzOffset() {
        return tzOffset;
    }

    public void setTzOffset(String tzOffset) {
        this.tzOffset = tzOffset;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    @Override
    public String toString() {
        return "HmsResponseMetadata{" +
                "prodName='" + prodName + '\'' +
                ", paramShortName='" + paramShortName + '\'' +
                ", paramName='" + paramName + '\'' +
                ", unit='" + unit + '\'' +
                ", undef='" + undef + '\'' +
                ", beginTime='" + beginTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", timeInterval='" + timeInterval + '\'' +
                ", totRecord='" + totRecord + '\'' +
                ", gridY='" + gridY + '\'' +
                ", gridX='" + gridX + '\'' +
                ", elevation='" + elevation + '\'' +
                ", dlat='" + dlat + '\'' +
                ", dlon='" + dlon + '\'' +
                ", ydim='" + ydim + '\'' +
                ", xdim='" + xdim + '\'' +
                ", startLat='" + startLat + '\'' +
                ", startLon='" + startLon + '\'' +
                ", lastUpdate='" + lastUpdate + '\'' +
                ", beginTimeIndex='" + beginTimeIndex + '\'' +
                ", endTimeIndex='" + endTimeIndex + '\'' +
                ", lat='" + lat + '\'' +
                ", lon='" + lon + '\'' +
                ", requestTime='" + requestTime + '\'' +
                ", temporalResolution='" + temporalResolution + '\'' +
                ", column1='" + column1 + '\'' +
                ", column2='" + column2 + '\'' +
                ", timezone='" + timezone + '\'' +
                ", tzOffset='" + tzOffset + '\'' +
                ", requestUrl='" + requestUrl + '\'' +
                '}';
    }
}
