package gov.epa.stormwater.webservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.service.CostRegionalizationService;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;


@Component
@Path("/v1/costingtest")
@Api(tags = "Costing Regionalization")
public class CostingResourceTest extends BaseResource {

    @Autowired
    private CostRegionalizationService costingService;

    //request example:  http://localhost:8080/swcalculator-server/api/v1/costingtest?seriesid=CUUR0000SA0&startyear=2016&endyear=2017

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCostRegionalizationTest(@QueryParam("seriesid") String seriesId,
                                               @QueryParam("startyear") String startyear,
                                               @QueryParam("endyear") String endyear) {


        String response = "";

        List<BlsCenterModel> output = new ArrayList<>();

        System.out.println("Test request to the API /v1/costingtest : seriesId = [" + seriesId + "], startyear = [" + startyear + "], endyear = [" + endyear + "]");


        if (seriesId == null || seriesId.isEmpty()
                || startyear == null || startyear.isEmpty()
                || endyear == null || endyear.isEmpty()) {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, "Params error !");
        }

        long startTime = System.currentTimeMillis();

        try {
            ArrayList<String> seriesIDs = new ArrayList<>();
            seriesIDs.add(seriesId);

            BlsCenterModel blsCenter = new BlsCenterModel();
            blsCenter.setBlsSeriesID("Other");
            blsCenter.setState("Other");
            blsCenter.setBlsCity("Other");
            blsCenter.setRegionalFactor(new Double(1));
            blsCenter.setLatitude(new Double(0));
            blsCenter.setLongitude(new Double(0));
            blsCenter.setDistToCurrentPoint(new Double(999999));
            blsCenter.setGeoID("Other");
            blsCenter.setBlsReadyMixConcID("Other");
            blsCenter.setBlsTractorShovelLoadersID("Other");
            blsCenter.setBlsEnergyID("Other");
            blsCenter.setBlsFuelsUtilitiesID("Other");
            blsCenter.setSelectString("Other (NA) 1");
            blsCenter.setInflationFactor(new Double(1));

            costingService.getBLSData(blsCenter, seriesIDs, startyear, endyear);

            output.add(blsCenter);
        } catch (SWCException e) {
            logger.error("Error getCostRegionalization()", e);
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, e.getMessage());
        }

        response = "REQUEST_SUCCEEDED >>> Request time: " + (System.currentTimeMillis() - startTime) + "ms ";
        System.out.println(response);

//        if (output != null && !output.isEmpty()) {
//            ObjectMapper mapper = new ObjectMapper();
//            try {
//                response += " <br> " + mapper.writeValueAsString(output.get(0));
//            } catch (JsonProcessingException e) {
//                System.out.println(e.getMessage());
//            }
//        }



        return Response.status(Response.Status.OK).entity(response).build();

    }
}
