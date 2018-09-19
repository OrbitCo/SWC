package gov.epa.stormwater.webservice;

/**
 * @author UYEN.TRAN
 */


import gov.epa.stormwater.model.bls.BlsCenterModel;

import javax.ws.rs.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import gov.epa.stormwater.service.common.SWCException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import io.swagger.annotations.ApiParam;

import java.util.ArrayList;
import java.util.List;

import gov.epa.stormwater.service.CostRegionalizationService;
import gov.epa.stormwater.service.common.Constants;

@Component
@Path("/v1/costing")
@Api(tags = "Costing Regionalization")
public class CostingResource extends BaseResource {

    @Autowired
    private CostRegionalizationService costingService;

    @GET
    //@Path("/getData")
    @ApiOperation(value = "Costing Regionalization Data", notes = "Get Costing Regionalization", response = BlsCenterModel.class)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCostRegionalization(
            @ApiParam(value = "latitude", required = true)
            @QueryParam("latitude") Double latitude,
            @ApiParam(value = "longitude", required = true)
            @QueryParam("longitude") Double longitude) {

        List<BlsCenterModel> output = null; //new ArrayList<BlsCenterModel>();

        String message = "";
        if (latitude == null || latitude == 0) {
            message = "Latitude is required and cannot be zero (0).";
            //return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM,  "Latitude is required and cannot be zero (0).");
        }

        if (longitude == null || longitude == 0) {
            if (message != "") {
                message = message + " ";
            }
            message = message + "Longitude is required and cannot be zero (0).";
            //return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, "Longitude is required and cannot be zero (0).");
        }

        if (message != "") {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, message);
        }

        try {
            output = costingService.parseRegDataAndComputeDist(latitude, longitude);
        } catch (SWCException e) {
            logger.error("Error getCostRegionalization()",
                    e);
            return swcExceptionResponse(e.toString());
        }
        
        /*
        if (output != null && !output.isEmpty() &)
            //return Response.status(Response.Status.).entity(output).build();
        }
        */

        return Response.status(Response.Status.OK).entity(output).build();

    }

    @POST
    @ApiOperation(value = "Costing Regionalization Data test", notes = "Get Costing Regionalization by id", response = BlsCenterModel.class)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCostRegionalizationTest(
            @ApiParam(value = "seriesid", required = true)
            @QueryParam("seriesid") String seriesId,
            @ApiParam(value = "startyear", required = true)
            @QueryParam("startyear") String startyear,
            @ApiParam(value = "endyear", required = true)
            @QueryParam("endyear") String endyear) {


        List<BlsCenterModel> output = new ArrayList<BlsCenterModel>();

        if (seriesId == null || seriesId.isEmpty()
                || startyear == null || startyear.isEmpty()
                || endyear == null || endyear.isEmpty()) {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, "error");
        }

        try {
            ArrayList<String> seriesIDs = new ArrayList<>();
            seriesIDs.add(seriesId);


            BlsCenterModel blsCenter = new BlsCenterModel();
            costingService.getBLSData(blsCenter, seriesIDs, startyear, endyear);

            output.add(blsCenter);
        } catch (SWCException e) {
            logger.error("Error getCostRegionalization()",
                    e);
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM, "error");
        }

        return Response.status(Response.Status.OK).entity(output).build();

    }
}
