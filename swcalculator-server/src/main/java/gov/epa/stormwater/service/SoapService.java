package gov.epa.stormwater.service;

import gov.epa.stormwater.service.common.SWCException;
import org.w3c.dom.Document;

/**
 *
 * @author UYEN.TRAN
 */
public interface SoapService {

    public Document soapRequest (String query) throws SWCException;
     
}
