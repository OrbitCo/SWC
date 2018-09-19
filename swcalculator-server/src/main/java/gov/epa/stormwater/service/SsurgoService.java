package gov.epa.stormwater.service;

import gov.epa.stormwater.model.SiteDataModel;
import gov.epa.stormwater.model.soil.SoilModel;
import gov.epa.stormwater.service.common.SWCException;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author UYEN.TRAN
 */
public interface SsurgoService {

    public List<SoilModel> findSoils(Double aLatitude, Double aLongitude,
            Integer searchRadius) throws SWCException;
    
   
}
