/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.ClimateModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.service.common.SWCException;

/**
 *
 * @author UYEN.TRAN
 */
public interface ClimateService {
    
    public void updateAdjustments(SiteData siteData) throws SWCException;
    //public ClimateModel updateAdjustments(Integer climateYear, String precStationID) throws SWCException;
     
    //public static String getEvapData(int climateIndex) {
    // public String getEvapData(int climateIndex, String evapStationID, int climateYear)throws SWCException;
     public String getEvapData(SiteData siteData) throws SWCException;
     
     public String getPrecipData(SiteData siteData) throws SWCException;
     
     public void getExtremeRainfall(SiteData siteData) throws SWCException;
     
}
