package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */


import gov.epa.stormwater.model.ClimateModel;
import gov.epa.stormwater.model.SiteData;

import gov.epa.stormwater.service.ClimateService;
import javax.ws.rs.GET;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import gov.epa.stormwater.service.common.SWCException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import io.swagger.annotations.ApiParam;
import javax.ws.rs.QueryParam;

@Component
@Path("/v1/climate")
@Api(tags = "Climate Data")
public class ClimateResource extends BaseResource {
    
    @Autowired
    private ClimateService climateService;

    @GET
    //@Path("/getData")
    @ApiOperation(value = "Climate Data", notes = "Get Climate Data", response = ClimateModel.class)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClimateData(          
            @ApiParam(value = "year (near term = 2035, far tearm = 2060)", required = true)
            @QueryParam("year") Integer year,
             @ApiParam(value = "precStationID", required = true)
            @QueryParam("precStationID") String precStationID
    ) {        
        
        ClimateModel output = new ClimateModel ();
        
        SiteData siteData = new SiteData();
        siteData.setClimateYear(year);
        siteData.setPrecStationID(precStationID);
        
        try {
            climateService.updateAdjustments(siteData);
            output = siteData.getClimateModel();
        } catch (SWCException e) {
            logger.error("Error getSoilData()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        /*
        if (output.getErrorMessage() != null & output.getErrorMessage() != "") {            
            //return Response.status(Response.Status.).entity(output).build();
        }
        */
        return Response.status(Response.Status.OK).entity(output).build();

    }
    
    
}
