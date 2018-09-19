package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */


import gov.epa.stormwater.model.soil.SoilMapPolygonModel;
import javax.ws.rs.GET;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import gov.epa.stormwater.service.GeoDataService;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import io.swagger.annotations.ApiParam;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.QueryParam;

@Component
@Path("/v1/soils")
@Api(tags = "Soil Data")
public class SoilResource extends BaseResource {
    
    @Autowired
    private GeoDataService getDataService;

    @GET
    //@Path("/getData")
    @ApiOperation(value = "Soil Data", notes = "Get Soil Data for Map Poly", response = SoilMapPolygonModel.class)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSoilData(
            @ApiParam(value = "latitude", required = true)
            @QueryParam("latitude") Double latitude,
            @ApiParam(value = "longitude", required = true)
            @QueryParam("longitude") Double longitude, 
            @ApiParam(value = "Valid values are 1000, 2000, 3000, 4000, 5000 for expanding the search radius.  If no value sent, default is 1000.", required = false)
    		@QueryParam("distance") Integer distance 
    		){        
        
        //SoilPolyModel output = new SoilPolyModel();
        List<SoilMapPolygonModel> output; 
        
        if (latitude == null || latitude == 0) {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM + "(latitude)", "Latitude is required and cannot be zero (0).");
        }
        
        if (longitude == null || longitude == 0) {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM + "(longitude)", "Longitude is required and cannot be zero (0).");
        }
                  
        try {
            output = getDataService.getSoilData(latitude, longitude, distance);
        } catch (SWCException e) {
            logger.error("Error getSoilData()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(output).build();

    }
    
    
}
