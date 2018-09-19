/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.met.EvapStationLocationModel;
import gov.epa.stormwater.model.met.MetStationModel;
import gov.epa.stormwater.model.met.PrecStationLocationModel;
import gov.epa.stormwater.model.soil.SoilMapPolygonModel;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.email.NotificationException;
import java.util.List;

/**
 *
 * @author UYEN.TRAN
 */
public interface GeoDataService {

    // public SoilPolyModel getSoilData(double lat, double lng) throws SWCException;
    public List<SoilMapPolygonModel> getSoilData(double lat, double lng, Integer aDistance) throws SWCException;

    public String getRainfallDataFile(String rainStationID) throws SWCException;
    
    public byte[] downloadRainfallData (String rainStationID) throws SWCException;
    
    public void emailRainfallData (String rainStationID, String emailTo) throws SWCException, NotificationException;
    
    /**
     * ************* These are all functions from SWC_D4EMLite ***************************
     */
    public MetStationModel getMetStations(double lat, double lng) throws SWCException;

    public List<PrecStationLocationModel> getPrecipClosest(Double aLatitude, Double aLongitude, Integer aMaxCount) throws SWCException;

    public Double greatCircleDistance(Double aLong1, Double aLat1, Double aLong2, Double aLat2);

    public List<PrecStationLocationModel> getPrecLocations() throws SWCException;

    public List<EvapStationLocationModel> getEvapLocations() throws SWCException;

    public List<EvapStationLocationModel> getEvapClosest(Double aLatitude, Double aLongitude, Integer aMaxCount) throws SWCException;

    public EvapStationLocationModel getEvapData(String evapStationID, Boolean dailyFlag) throws SWCException;

    public byte[] downloadEvapData (String rainStationID) throws SWCException;
    
    public void emailEvapData (String rainStationID, String emailTo, String staNam) throws SWCException, NotificationException;
    
    public  List<Double> getEvapDataTimeSeriesFormat(String evapStationID, Boolean dailyFlag) throws SWCException;

    public void setStartEndYearsPrecip(SiteData siteData) throws SWCException;

}
