package gov.epa.stormwater.service;

import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.SiteDataModel;
import gov.epa.stormwater.service.common.SWCException;
import java.io.IOException;

/**
 *
 * @author UYEN.TRAN
 */

public interface CalculateService {
    
    public int runSwmm(String inFile, String rptFile, String outFile) throws SWCException ;
    
    public SiteData computeResults(SiteDataModel siteDataModel) throws SWCException, IOException; 
    
    public String getScsType(String rainStationID) throws SWCException ;
    
    //4Testing
   // public void writeBaseInpFile (SiteData siteData) throws SWCException;
    
}



