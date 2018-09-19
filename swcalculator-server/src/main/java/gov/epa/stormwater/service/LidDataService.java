/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.service.common.SWCException;
import java.io.BufferedWriter;

/**
 *
 * @author UYEN.TRAN
 */
public interface LidDataService {
    
    public void writeLidControls(BufferedWriter bw, SiteData siteData) throws SWCException ;
    public void writeLidUsage(BufferedWriter bw, SiteData siteData) throws SWCException ;
    
}
