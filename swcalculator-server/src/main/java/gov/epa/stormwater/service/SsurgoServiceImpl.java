/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import gov.epa.stormwater.model.soil.PolygonModel;
import gov.epa.stormwater.model.soil.SoilLayerModel;
import gov.epa.stormwater.model.soil.SoilModel;
import gov.epa.stormwater.model.XYPairModel;
import gov.epa.stormwater.service.common.SWCException;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 *
 * @author UYEN.TRAN
 */
@Service("sSurgoService")
public class SsurgoServiceImpl implements SsurgoService {

    private static Logger logger = LoggerFactory
            .getLogger(SsurgoServiceImpl.class);

    @Autowired
    SoapService soapService;

    public List<SoilModel> findSoils(Double aLatitude, Double aLongitude,
            Integer searchRadius) throws SWCException {

        List<SoilModel> soils = new ArrayList<SoilModel>();

        Integer aDistance = new Integer(1000);
        
        if (searchRadius != null ) {
        	aDistance = searchRadius;
        }

        // Create a list of Soil objects to return
        //TODO ?? doesn't appear to be used boolean foundValidHSG = false;
        // Create an HTTP request to get all of the SSURGO mapping units
        // within Distance of the target location
        String filter = "<Filter>"
                + "  <DWithin>"
                + "    <PropertyName>Geometry</PropertyName>"
                + "    <gml:Point>"
                + "       <gml:coordinates>"
                + aLongitude.toString()
                + ","
                + aLatitude.toString()
                + "</gml:coordinates>"
                + "    </gml:Point>"
                + "    <Distance%20units='m'>"
                + aDistance.toString()
                + "</Distance>"
                + "  </DWithin>"
                + "</Filter>";

        filter = filter.replaceAll("<", "%3C");
        filter = filter.replaceAll(">", "%3E");
        filter = filter.replaceAll(" ", "+");

        String URL = "https://sdmdataaccess.nrcs.usda.gov/Spatial/SDMNAD83Geographic.wfs?Service=WFS&Version=1.0.0&Request=GetFeature&Typename=MapunitPoly&Filter="
                + filter;
        String resultXml;

        // Create object to submit the HTTP request
        ClientConfig config = new DefaultClientConfig();
        Client client = Client.create(config);
        WebResource service = client.resource(URL);

        try {
            // Submit the request and retrieve the response
            resultXml = service.get(String.class);

            if (resultXml != null) {
                // Parse the resulting XML with the mapping units info in it
                // to obtain boundaries and ultimately soil data for each unit
                parseResultXml(resultXml, soils);
            }
        } catch (Exception e) {
            logger.error("SsurgoServiceImpl.findSoils(): " + e.getMessage());
            throw new SWCException("Error retreiving soil data: " + e.getMessage());
        }

        return soils;
        
    }

    private void parseResultXml(String resultXml, List<SoilModel> soils) throws SWCException {

        try {
            DocumentBuilderFactory dbf
                    = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            InputSource is = new InputSource();
            is.setCharacterStream(new StringReader(resultXml));

            try {
                Document doc = db.parse(is);
                NodeList nodes = doc.getElementsByTagName("gml:featureMember");

                // iterate featureMember
                for (int i = 0; i < nodes.getLength(); i++) {
                    Element element = (Element) nodes.item(i);
                    NodeList nodesMapUnitPolys = element.getElementsByTagName("ms:mapunitpoly");
                    for (int a = 0; a < nodesMapUnitPolys.getLength(); a++) {
                        //String skey = element.getElementsByTagName("ms:mukey").item(0).getTextContent();
                        //logger.debug("mukey: " + skey);

                        // Skip surface water mapping units
                        String s = element.getElementsByTagName("ms:musym").item(0).getTextContent();
                        //logger.debug("ms:musym: " + s);
                        if (s.equalsIgnoreCase("W")) {
                            logger.debug("ms:musym=W found: " + s);
                            continue;
                        }
                        soils.add(addSoil(nodesMapUnitPolys, a));
                    }
                }
            } catch (SAXException e) {
                // handle SAXException
                logger.error("SsurgoService.parseResultXml: " + e.toString());
                throw new SWCException(e.getMessage());
            } catch (IOException e) {
                // handle IOException
                logger.error("SsurgoService.parseResultXml: " + e.toString());
                throw new SWCException(e.getMessage());
                //TODO?? Ssurgo.FoundValidHSG = false;
            }

            // SortedList<String, Soil> UniqueLayerProperties = new SortedList<String, Soil>();
            Map<String, SoilModel> uniqueLayerProperties = new HashMap<String, SoilModel>();

            for (SoilModel soil : soils) {
                getLayerProperties(soil, uniqueLayerProperties);
            }
        } catch (Exception e) {
            //MessageBox.Show("Invalid response from SSURGO web service.");
            //Ssurgo.FoundValidHSG = false;
            logger.error("sSurgoService.parseResultXml: " + e.getMessage());
            throw new SWCException("Invalid response from SSURGO web service. " + e.getMessage());
        }
    }

    private SoilModel addSoil(NodeList nodes, int i) {

        SoilModel soil = new SoilModel();
        List<PolygonModel> polygons = new ArrayList<PolygonModel>();

        double x, y;
        Element element = (Element) nodes.item(i);
        soil.setArea(element.getElementsByTagName("ms:areasymbol").item(0).getTextContent());
        soil.setSymbol(element.getElementsByTagName("ms:musym").item(0).getTextContent());
        soil.setKey(element.getElementsByTagName("ms:mukey").item(0).getTextContent());

        // Mapping Unit's outer boundary polygon
        String outerBoundary = element.getElementsByTagName("gml:outerBoundaryIs").item(0).getTextContent();
        String outerCoords[] = outerBoundary.trim().split("\\s+|,");
        PolygonModel polygon = new PolygonModel();
        for (int a = 1; a < outerCoords.length; a = a + 2) {
            x = Double.parseDouble(outerCoords[a - 1]);
            y = Double.parseDouble(outerCoords[a]);
            polygon.getCoord().add(new XYPairModel(x, y));
        }
        polygons.add(polygon);
        soil.setPolygons(polygons);
        /*
 * Kept comments from C#
 * Skip inner polygons (holes) since there's no easy way to display them on the Bing map
 * 
            // Mapping Unit's inner polygons (i.e., holes)
            if (XMLdocFeature.GetElementsByTagName("gml:innerBoundaryIs").Item(Index) != null)
            {
                for (int IndexInnerBoundary = 0;
                         IndexInnerBoundary < XMLdocFeature.GetElementsByTagName("gml:innerBoundaryIs").Count;
                         IndexInnerBoundary++)
                {
                    string InnerBoundary = XMLdocFeature.GetElementsByTagName("gml:innerBoundaryIs").Item(IndexInnerBoundary).InnerText;
                    string[] InnerCoords = InnerBoundary.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);
                    Polygon innerPolygon = new Polygon();
                    innerPolygon.Outer = false;
                    for (int i = 1; i < InnerCoords.Length; i = i + 2)
                    {
                        if (Double.TryParse(InnerCoords[i - 1], out x) &&
                            Double.TryParse(InnerCoords[i], out y))
                        {
                            innerPolygon.Coord.Add(new XYPair(x, y));
                        }
                    }
                    aSoil.Polygons.Add(innerPolygon);
                }
            }
         */
        return soil;
    }

    private void getLayerProperties(SoilModel soil, Map<String, SoilModel> uniqueLayerProperties) throws SWCException {

        logger.debug("START getLayerProperties: " + soil.getKey());
        if (uniqueLayerProperties.containsKey(soil.getKey())) {
            soil.setLayers(uniqueLayerProperties.get(soil.getKey()).getLayers());
        } else {
            //Grab only values (soilLayerModel) from map to setLayers
            soil.setLayers(new ArrayList<>(findSoilLayerProperties(soil.getKey(), soil.getArea()).values()));
            uniqueLayerProperties.put(soil.getKey().toString(), soil);
        }

        // determine dominant component
        int domPct = 0;

        for (SoilLayerModel slm : soil.getLayers()) {
            if (slm.getCompPct_R() > domPct) {
                domPct = slm.getCompPct_R();
            }
        }

        double depthTotal = 0.0;
        double ksatTotal = 0.0;

        for (SoilLayerModel slm2 : soil.getLayers()) {
            if (slm2.getCompPct_R().compareTo(domPct) == 0) {
                //only use dominant component in weighted average calculation
                double depthNow = slm2.getDepthToBottom() - slm2.getDepthToTop();
                depthTotal += depthNow;
                ksatTotal += (depthNow * slm2.getKSAT());
                if (slm2.getDepthToTop().compareTo(new Double(0)) == 0) {
                    soil.setKSAT_Surface(slm2.getKSAT());
                    soil.setSlope_R(slm2.getSlope_R());
                }
                if (slm2.getDepthToTop().compareTo(new Double(0)) == 0) {
                    //TODO!!! Ssurgo.FoundValidHSG = true;
                    soil.setHSG(slm2.getHSG());
                }
            }

            if (depthTotal > 0) {
                slm2.setKSAT(ksatTotal / depthTotal);
            } else {
                slm2.setKSAT(new Double(-999));
                soil.setKSAT_Surface(new Double(-999));
            }
        }
    }

    private Map<String, SoilLayerModel> findSoilLayerProperties(String aKey, String aArea) throws SWCException {
        
        logger.debug("START findSoilLayerProp: " + aKey + " - " + aArea);
        final String CR = "\r";
        String url = "https://sdmdataaccess.nrcs.usda.gov/Tabular/SDMTabularService.asmx";

        if (aKey == null || aKey.length() == 0) {
            return null;
        }
        
        //SortedList<String, SoilLayer> SoilLayers = new SortedList<String, SoilLayer>();
        Map<String, SoilLayerModel> soilLayers = new HashMap<String, SoilLayerModel>();

        // This is the SQL query to be submitted to the SSURGO web service
        String query = "SELECT" + CR
                + "saversion, saverest," + CR
                + "l.areasymbol, l.areaname, l.lkey," + CR
                + "mu.musym, mu.muname, museq, mu.mukey," + CR
                + "hydgrpdcd" + CR
                + "compname, slope_r, comppct_r, c.cokey, " + CR
                + "hzdept_r, hzdepb_r, ksat_r, ch.chkey " + CR
                + "FROM sacatalog sac" + CR
                + "INNER JOIN legend l ON l.areasymbol = sac.areasymbol" + CR
                + "AND l.areasymbol = " + "'" + aArea + "'" + CR
                + "INNER JOIN mapunit mu ON mu.lkey = l.lkey" + CR
                + "AND mu.mukey = " + "'" + aKey + "'" + CR
                + "LEFT OUTER JOIN muaggatt m ON m.mukey = mu.mukey" + CR
                + "LEFT OUTER JOIN component c ON c.mukey = mu.mukey" + CR
                + "LEFT OUTER JOIN chorizon ch ON ch.cokey = c.cokey" + CR;

        // SSURGO web service required by the Service Reference is:
        //"https://sdmdataaccess.nrcs.usda.gov/Tabular/SDMTabularService.asmx".
        /*
        ServiceReference1.SDMTabularServiceSoapClient Soap = new ServiceReference1.SDMTabularServiceSoapClient();
        System.Data.DataSet SystemDataSet = Soap.RunQuery(Query);
        Soap.Close();
         */
        Document doc = soapService.soapRequest(query);
        // Now we extract the data for each soil layer in the mapping unit we queried.
        if (doc != null) {
            NodeList nodes = doc.getElementsByTagName("Table");
            //Check for data in response
            if (nodes == null) {
                logger.error("No soil data in SOAP response found");
                throw new SWCException("findSoilLayerProperties: No soil data found from web request");
            }

            String name = "";

            // iterate Table
            for (int i = 0; i < nodes.getLength(); i++) {
                Element element = (Element) nodes.item(i);
                //logger.debug("saveversion: " + element.getElementsByTagName("saversion").item(0).getTextContent());
                //logger.debug("muname: " + element.getElementsByTagName("muname").item(0).getTextContent());
                name = element.getElementsByTagName("muname").item(0).getTextContent(); // FieldNumbers.musym];
                String key = element.getElementsByTagName("chkey").item(0).getTextContent();    // FieldNumbers.chkey];
                String hSG = element.getElementsByTagName("compname").item(0).getTextContent();    //value came from compname as debugging C# // FieldNumbers.hydgrpdcd];
                String compPct_R = element.getElementsByTagName("comppct_r").item(0).getTextContent();
                String slope_R = element.getElementsByTagName("slope_r").item(0).getTextContent();
                if (hSG.length() > 0) {
                    String hzdept_r = element.getElementsByTagName("hzdept_r").item(0).getTextContent();   // FieldNumbers.hzdept_r];
                    String hzdepb_r = element.getElementsByTagName("hzdepb_r").item(0).getTextContent();   // FieldNumbers.hzdepb_r];
                    String ksat_r = element.getElementsByTagName("ksat_r").item(0).getTextContent();   //FieldNumbers.ksat_r];
                    SoilLayerModel layer = new SoilLayerModel();
                    layer.setDepthToTop(NumberUtils.isNumber(hzdept_r) ? Double.parseDouble(hzdept_r) : -999);
                    layer.setDepthToBottom(NumberUtils.isNumber(hzdepb_r) ? Double.parseDouble(hzdepb_r) : -999);
                    layer.setKSAT(NumberUtils.isNumber(ksat_r) ? Double.parseDouble(ksat_r) : -999);
                    layer.setHSG(hSG);
                    layer.setCompPct_R(NumberUtils.isNumber(compPct_R) ? Integer.parseInt(compPct_R) : 0);
                    layer.setSlope_R(NumberUtils.isNumber(slope_R) ? Double.parseDouble(slope_R) : 0);
                    if (!soilLayers.containsKey(key)) {
                        soilLayers.put(key, layer);
                    }
                }
            }
        } else {
            //TODO - return validation instead of server error
            throw new SWCException("Error retrieving data for soil layers.");
        }

        logger.debug("FINISHED findSoilLayerProp: " + aKey + " - " + aArea);
        return soilLayers;
    }

}
