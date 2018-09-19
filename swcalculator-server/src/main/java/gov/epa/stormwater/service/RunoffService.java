/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.RunoffModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.XEventModel;
import gov.epa.stormwater.service.common.SWCException;
import java.io.IOException;

/**
 *
 * @author UYEN.TRAN
 */
public interface RunoffService {
    
    public RunoffModel getWaterBudget(int years, String rptFile) throws SWCException;
    
    public XEventModel getPeakValues(String outFile, SiteData siteData) throws SWCException, IOException;
    
    public int getStats(String outFile, SiteData siteData) throws SWCException, IOException;
    
}
