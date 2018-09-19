/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.bls.SeriesModel;
import gov.epa.stormwater.service.common.SWCException;
import java.util.List;

/**
 *
 * @author UYEN.TRAN
 */
public interface CostRegionalizationService {

    public List<BlsCenterModel> parseRegDataAndComputeDist(double lat, double lng) throws SWCException;

    public List<BlsCenterModel> findNearestBLSCenter(List<BlsCenterModel> blsCenters, double lng, double lat) throws SWCException;public double distanceTo(double lat1, double lon1, double lat2, double lon2, String unit) throws SWCException;
   
            
    public boolean computeRegionalizationMult(List<BlsCenterModel> blsCenters) throws SWCException;

    //public boolean getBLSData(BlsCenterModel blsCenter, String[] seriesIDs, String startyear, String endyear) throws SWCException;
    public boolean getBLSData(BlsCenterModel blsCenter, List<String> seriesIDs, String startyear, String endyear) throws SWCException;

    public void computeAndSaveRegMult(BlsCenterModel blsCity, List<SeriesModel> blsSeriesArr) throws SWCException;

    public String getSeriesIDMapping(String seriesID) throws SWCException;
}
