package gov.epa.stormwater.service;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.model.bls.BlsResponseModel;
import gov.epa.stormwater.model.bls.DataModel;
import gov.epa.stormwater.model.bls.SeriesModel;
import gov.epa.stormwater.service.common.SWCException;
import org.junit.Test;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ResponseTest {
    String response = "{\"status\":\"REQUEST_SUCCEEDED\",\"responseTime\":118,\"message\":[],\"Results\":{\n" +
            "\"series\":\n" +
            "[{\"seriesID\":\"CUUR0000SA0\",\"data\":[{\"year\":\"2017\",\"period\":\"M13\",\"periodName\":\"Annual\",\"value\":\"245.120\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M12\",\"periodName\":\"December\",\"value\":\"246.524\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M11\",\"periodName\":\"November\",\"value\":\"246.669\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M10\",\"periodName\":\"October\",\"value\":\"246.663\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M09\",\"periodName\":\"September\",\"value\":\"246.819\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M08\",\"periodName\":\"August\",\"value\":\"245.519\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M07\",\"periodName\":\"July\",\"value\":\"244.786\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M06\",\"periodName\":\"June\",\"value\":\"244.955\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M05\",\"periodName\":\"May\",\"value\":\"244.733\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M04\",\"periodName\":\"April\",\"value\":\"244.524\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M03\",\"periodName\":\"March\",\"value\":\"243.801\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M02\",\"periodName\":\"February\",\"value\":\"243.603\",\"footnotes\":[{}]},{\"year\":\"2017\",\"period\":\"M01\",\"periodName\":\"January\",\"value\":\"242.839\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M13\",\"periodName\":\"Annual\",\"value\":\"240.007\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M12\",\"periodName\":\"December\",\"value\":\"241.432\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M11\",\"periodName\":\"November\",\"value\":\"241.353\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M10\",\"periodName\":\"October\",\"value\":\"241.729\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M09\",\"periodName\":\"September\",\"value\":\"241.428\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M08\",\"periodName\":\"August\",\"value\":\"240.849\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M07\",\"periodName\":\"July\",\"value\":\"240.628\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M06\",\"periodName\":\"June\",\"value\":\"241.018\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M05\",\"periodName\":\"May\",\"value\":\"240.229\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M04\",\"periodName\":\"April\",\"value\":\"239.261\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M03\",\"periodName\":\"March\",\"value\":\"238.132\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M02\",\"periodName\":\"February\",\"value\":\"237.111\",\"footnotes\":[{}]},{\"year\":\"2016\",\"period\":\"M01\",\"periodName\":\"January\",\"value\":\"236.916\",\"footnotes\":[{}]}]}]\n" +
            "}}";

    @Test
    public void requestTest(){

        String jsonString = "{\"seriesid\":[\"CUUR0000SA0\"],\"startyear\":\"2016\",\"endyear\":\"2017\",\"catalog\":false,\"calculations\":false,\"annualaverage\":true,\"registrationKey\":\"408c86477d784c4abf2b179a79d5e79f\"}";

        String URL = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

        // Create object to submit the HTTP request
        ClientConfig config = new DefaultClientConfig();
        Client client = Client.create(config);
        WebResource service = client.resource(URL);


        System.out.println("### request to API");
        System.out.println("### jsonString = " + jsonString);

        ClientResponse response = service.type("application/json")
                .post(ClientResponse.class, jsonString);

        System.out.println("### response = " + response);

        if (response.getStatus() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                    + response.getStatus());
        }


        BlsResponseModel resp =  response.getEntity(BlsResponseModel.class);
        System.out.println("resp = " + resp);

        //check to see if success response received
        if (resp.getStatus().equalsIgnoreCase("REQUEST_SUCCEEDED")) {
            System.out.println("REQUEST_SUCCEEDED");
//            computeAndSaveRegMult(blsCity, resp.getResults().getSeries());
            System.out.println( resp.getResults().getSeries());

        }
    }

}
