package gov.epa.stormwater.service;

import gov.epa.stormwater.model.bls.BlsResponseModel;
import gov.epa.stormwater.model.bls.SeriesPostModel;
import gov.epa.stormwater.service.common.SWCException;

public interface CostRegionalizationCacheService {
    public BlsResponseModel getFromCache(SeriesPostModel seriesPost);
    public void putToCache(SeriesPostModel seriesPost, BlsResponseModel response) throws SWCException;
}
