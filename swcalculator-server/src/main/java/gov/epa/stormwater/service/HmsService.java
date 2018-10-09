package gov.epa.stormwater.service;

import gov.epa.stormwater.service.common.SWCException;

public interface HmsService {
    boolean getHMSData(String filePath, String stationId, String startYear, String endYear) throws SWCException;
}
