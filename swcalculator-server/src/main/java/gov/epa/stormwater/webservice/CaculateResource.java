package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.SiteDataModel;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import gov.epa.stormwater.service.CalculateService;
import gov.epa.stormwater.service.common.SWCException;

@Component
@Path("/v1/calculate")
@Api(tags = "Site Data")
public class CaculateResource extends BaseResource {

    @Autowired
    private CalculateService calculateService;    
    
    @POST
    @Path("/siteData")
    @ApiOperation(value = "Site Data", notes = "Site Data", response = SiteDataModel.class
    )
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON})
    public Response siteData(@Context HttpServletRequest httpRequest,
            @Context HttpServletResponse servletResponse,
            @ApiParam(value = "Site data", required = true) SiteDataModel request
    ) {

        SiteData output = new SiteData();

//        System.out.println(" ############ request = " + request.toString());

        if (request == null) {
            System.out.println("########## request == null");

             return swcErrorResponse(Response.Status.NOT_ACCEPTABLE, "Missing site input data", "No site input data found");
        }
        
        try {
            System.out.println("######### output = calculateService.computeResults(request);");

            output = calculateService.computeResults(request);



        } catch (SWCException e) {
            logger.error("Failed to compute results due to exception.",
                    e.getMessage());
            return swcExceptionResponse(e.toString());
        } catch (IOException ie) {
            //TODO
        }

        return Response.status(Response.Status.OK).entity(output).build();
    }




}
