/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.service.common.SWCException;
import java.io.ByteArrayOutputStream;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

/**
 *
 * @author UYEN.TRAN
 */
@Service("soapService")
public class SoapServiceImpl implements SoapService {

    private static Logger logger = LoggerFactory
            .getLogger(SoapServiceImpl.class);

    @Override
    public Document soapRequest(String query) throws SWCException {

        Document doc;
        String strResponse;

        final String URL = "https://SDMDataAccess.nrcs.usda.gov/Tabular/SDMTabularService.asmx"; //this is case sensitive!!

        try {
            // Create SOAP Connection
            SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
            SOAPConnection soapConnection = soapConnectionFactory.createConnection();

            // Send SOAP Message to SOAP Server
            SOAPMessage soapResponse = soapConnection.call(createSOAPRequest(query, URL), URL);

            // Convert XML to String            
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            soapResponse.writeTo(out);
            strResponse = new String(out.toByteArray(), "UTF-8");
            //Check that there is data in response
            //NodeList nodes = soapResponse.getSOAPBody().getElementsByTagName("NewDataSet");
            SOAPPart soapPart = soapResponse.getSOAPPart();
            // SOAP Envelope
            SOAPEnvelope envelope = soapPart.getEnvelope();          
            // SOAP Body
            SOAPBody soapBody = envelope.getBody();
            doc = soapBody.extractContentAsDocument();

            logger.debug("SOAP Response: " + strResponse);
            soapConnection.close();
        } catch (Exception e) {
            logger.error("Error occurred while sending SOAP Request to Server");
            throw new SWCException("Error occurred while sending SOAP Request to Server: " + e.getMessage());
        }

        return doc;
    }

    private SOAPMessage createSOAPRequest(String query, String url) throws Exception {

        final String SDM = "sdm";
        //String serverURI = "http://sdmdataaccess.nrcs.usda.gov";    //The envelope header needs to have http
        String namespace = "http://SDMDataAccess.nrcs.usda.gov/Tabular/SDMTabularService.asmx";

        /* 4 testing only
        String queryTest = "SELECT\n"
                + "saversion, saverest,\n"
                + "l.areasymbol, l.areaname, l.lkey,\n"
                + "mu.musym, mu.muname, museq, mu.mukey,\n"
                + "hydgrpdcd\n"
                + "compname, slope_r, comppct_r, c.cokey, \n"
                + "hzdept_r, hzdepb_r, ksat_r, ch.chkey \n"
                + "FROM sacatalog sac\n"
                + "INNER JOIN legend l ON l.areasymbol = sac.areasymbol\n"
                + "AND l.areasymbol = 'VA059'\n"
                + "INNER JOIN mapunit mu ON mu.lkey = l.lkey\n"
                + "AND mu.mukey = '2250537'\n"
                + "LEFT OUTER JOIN muaggatt m ON m.mukey = mu.mukey\n"
                + "LEFT OUTER JOIN component c ON c.mukey = mu.mukey\n"
                + "LEFT OUTER JOIN chorizon ch ON ch.cokey = c.cokey";
        */
        
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        SOAPPart soapPart = soapMessage.getSOAPPart();

        // SOAP Envelope
        SOAPEnvelope envelope = soapPart.getEnvelope();
        //envelope.addNamespaceDeclaration(SDM, url);
        envelope.addNamespaceDeclaration(SDM, namespace);

        // SOAP Body
        SOAPBody soapBody = envelope.getBody();
        SOAPElement soapBodyElem = soapBody.addChildElement("RunQuery", SDM);
        SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("Query", SDM);
        soapBodyElem1.addTextNode(query);

        //Must be set
        MimeHeaders headers = soapMessage.getMimeHeaders();
        //headers.addHeader("soapAction", url + "/RunQuery");
        headers.addHeader("soapAction", namespace + "/RunQuery");
        

        //Write out message for debugging
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        soapMessage.writeTo(out);
        String str = new String(out.toByteArray());
        logger.debug("SOAP Message: " + str);

        soapMessage.saveChanges();

        return soapMessage;
    }
}
