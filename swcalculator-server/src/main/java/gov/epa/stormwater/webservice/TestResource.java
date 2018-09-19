package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */


import gov.epa.stormwater.model.BaseModel;
import gov.epa.stormwater.model.met.MetStationModel;
import gov.epa.stormwater.model.met.PrecStationLocationModel;
import javax.ws.rs.GET;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import gov.epa.stormwater.service.GeoDataService;
import gov.epa.stormwater.service.common.SWCException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import gov.epa.stormwater.service.SoapService;
import gov.epa.stormwater.service.SsurgoService;
import gov.epa.stormwater.service.common.Constants;
import io.swagger.annotations.ApiParam;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.QueryParam;
import gov.epa.stormwater.service.email.EmailNotificationService;

@Component
@Path("/v1/test")
@Api(tags = "Test")
public class TestResource extends BaseResource {
    
    @Autowired
    private GeoDataService geoDataService;

    @Autowired
    private SoapService soapService;
    
    @Autowired
    private SsurgoService ssurgoService;
    
    @Autowired
    private EmailNotificationService emailNotificationService;

    @GET
    @Path("/soapTest")
    @ApiOperation(value = "Soap Test", notes = "Test SOAP call", response = String.class)
    @Produces(MediaType.APPLICATION_JSON)
    public Response testSOAP() {
        
        try {
            soapService.soapRequest("query");
        } catch (SWCException e) {
             logger.error("Error soapRequest()",
                    e);
            return swcExceptionResponse(e.toString());
        }
        return Response.status(Response.Status.OK).entity("OK").build();
    }    
    
    @GET
    @Path("/hello")   
    @ApiOperation(value = "hello", notes = "hello", response = String.class
    )
    @Produces({MediaType.APPLICATION_JSON})
    public Response test() {
        
        return Response.status(200).entity("Hello there!!!").build();
    }    
    
     @GET
    @Path("/precip")   
    @ApiOperation(value = "Precip data", notes = "precip data", response = PrecStationLocationModel.class
    )
    @Produces({MediaType.APPLICATION_JSON})
    public Response testPrecip() {
             
          try {
            List<PrecStationLocationModel> output = geoDataService.getPrecLocations();
             return Response.status(200).entity(output).build();
        } catch (SWCException e) {
             logger.error("Error soapRequest()",
                    e);
            return swcExceptionResponse(e.toString());
        }
       
    }
         @GET
    @Path("/precipClosest")   
    @ApiOperation(value = "Precip data", notes = "precip data", response = PrecStationLocationModel.class
    )
    @Produces({MediaType.APPLICATION_JSON})
    public Response getPrecipClosest( @ApiParam(value = "latitude", required = true)
            @QueryParam("latitude") Double latitude,
             @ApiParam(value = "longitude", required = true)
            @QueryParam("longitude") Double longitude) {
        
       MetStationModel output;
       
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
            output = geoDataService.getMetStations(latitude, longitude);
        } catch (SWCException e) {
            logger.error("Error getCostRegionalization()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(output).build();
    }
    
    @Autowired
    private GeoDataService getDataService;

/*    
    @GET
    @Path("/emailTest")   
    @ApiOperation(value = "Email Test", notes = "Test email function", response = BaseModel.class
    )
    @Produces({MediaType.APPLICATION_JSON})
    public Response testEmail( 
            @ApiParam(value = "emailTo", required = true)
            @QueryParam("emailTo") String emailTo) 
            throws SWCException {
        
        BaseModel output = new BaseModel();
        
        if (emailTo == null || emailTo.trim() == "") {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM + "(emailTo)", "Email Address is required in order to send email.");
        }
        
        try {
            emailNotificationService.sendMail(emailTo, "Test Email", "Yes, this works!!");
            //return Response.status(200).entity(output).build();
            output.setErrorMessage("Email sent to " + emailTo);
            return Response.status(200).entity(output).build();
        } catch (Exception notificationEx) {                
            logger.error("Exception occured while sending notification email"+ notificationEx);
            throw new SWCException(notificationEx);
        /*
        } catch (SWCException e) {
             logger.error("Error soapRequest()",
                    e);
            return swcExceptionResponse(e.toString());
            */
/*    
        }    
    }

    
    @GET
    @Path("/emailTestAttach")   
    @ApiOperation(value = "Email Test", notes = "Test email function w/attachment", response = BaseModel.class
    )
    @Produces({MediaType.APPLICATION_JSON})
    public Response testEmailAttach( 
            @ApiParam(value = "emailTo", required = true)
            @QueryParam("emailTo") String emailTo) 
            throws SWCException {
        
        BaseModel output = new BaseModel();
        
        if (emailTo == null || emailTo.trim() == "") {
            return swcErrorResponse(Response.Status.BAD_REQUEST, Constants.MISSING_PARAM + "(emailTo)", "Email Address is required in order to send email.");
        }
        
        try {
            //emailNotificationService.sendMailAttachment(emailTo, "Test Email", "Yes, this works!!");
            //return Response.status(200).entity(output).build();
            output.setErrorMessage("Email sent to " + emailTo);
            return Response.status(200).entity(output).build();
        } catch (Exception notificationEx) {                
            logger.error("Exception occured while sending notification email"+ notificationEx);
            throw new SWCException(notificationEx);
        /*
        } catch (SWCException e) {
             logger.error("Error soapRequest()",
                    e);
            return swcExceptionResponse(e.toString());
            */
/*
	}    
    }

*/   
}
