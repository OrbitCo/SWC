package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import gov.epa.stormwater.model.SiteDataModel;

import javax.ws.rs.GET;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import gov.epa.stormwater.service.GeoDataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.email.EmailNotificationService;
import gov.epa.stormwater.service.utils.Utils;
import io.swagger.annotations.ApiParam;
import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;

@Component
@Path("/v1/email")
@Api(tags = "Email Sender")
public class EmailResource extends BaseResource {

    @Autowired
    private GeoDataService geoDataService;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @GET
    @ApiOperation(value = "Email Precip Data File", notes = "HTTP Response 200 if success (Swagger does not display response body correctly)."
    )
    @Path("/precipData/{precStationID}/{emailTo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response emailPrecipData(
            @ApiParam(value = "precStationID", required = true)
            @PathParam("precStationID") String precStationID,
            @ApiParam(value = "emailTo", required = true)
            @PathParam("emailTo") String emailTo
    ) {

        try {
            geoDataService.emailRainfallData(precStationID, emailTo);
        } catch (Exception notificationEx) {
            logger.error("Error emailPrecipData()",
                    notificationEx);
            return swcExceptionResponse(notificationEx.toString());
        }

        return Response.status(200).entity("Email sent with precip data").build();
    }

    @GET
    @ApiOperation(value = "Email Evap Data File", notes = "HTTP Response 200 if success (Swagger does not display response body correctly)."
    )
    @Path("/evapData/{evapStationID}/{emailTo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response emailEvapData(
            @ApiParam(value = "evapStationID", required = true)
            @PathParam("evapStationID") String evapStationID,
            @ApiParam(value = "Evap Station Name.  Used as part of file name.", required = false)
            @QueryParam("staNam") String staNam,
            @ApiParam(value = "emailTo", required = true)
            @PathParam("emailTo") String emailTo      
    ) {        
       
        try {
            geoDataService.emailEvapData(evapStationID, emailTo, staNam);
        } catch ( Exception notificationEx) {
            logger.error("Error emailEvapData()",
                    notificationEx);
            return swcExceptionResponse(notificationEx.toString());
        }

        return Response.status(200).entity("Email sent with evap data").build();
    }

    
    @POST
    @ApiOperation(value = "Email Site Data File", notes = "")
    @Path("/emailFile/{emailTo}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response emailFile(
            @ApiParam(value = "emailTo", required = true)
            @PathParam("emailTo") String emailTo,
            @FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {
     
        try {

            //InputStreamResource is = new InputStreamResource(fileInputStream);            
            ByteArrayResource in = new ByteArrayResource(IOUtils.toByteArray(fileInputStream));
            emailNotificationService.sendMailAttachment(emailTo, Constants.EMAIL_SUBJ_SITE, Constants.EMAIL_BODY_SITE, contentDispositionHeader.getFileName(), in);
            
        } catch ( Exception notificationEx) {
            logger.error("Error emailFileData()",
                    notificationEx);
            return swcExceptionResponse(notificationEx.toString());
        }
        
        return Response.status(200).entity("Email sent with attached file").build();

    }
    
    @POST
    @ApiOperation(value = "Email XML", notes = "Expecting String representation of XML")
    @Path("/emailXml/{emailTo}")
    @Consumes(MediaType.APPLICATION_XML)
    public Response emailXml(
            @ApiParam(value = "emailTo", required = true)
            @PathParam("emailTo") String emailTo,
            @ApiParam(value = "fileName", required = true)
            @QueryParam("fileName") String fileName,
            //@ApiParam(value = "Site data", required = true) SiteDataModel request
            @ApiParam(value = "Site data", required = true) String request
    ){

        if (request == null) {
             return swcErrorResponse(Response.Status.NOT_ACCEPTABLE, "Missing site input data", "No site input data found");
        }
                    
        if (fileName == null || fileName.equals("")) {
            fileName = "SWCalc_SavedSite.xml";
        }
        
        try {

            //InputStreamResource is = new InputStreamResource(fileInputStream);
            ByteArrayResource in = new ByteArrayResource(request.getBytes("UTF-8"));
            emailNotificationService.sendMailAttachment(emailTo, Constants.EMAIL_SUBJ_SITE, Constants.EMAIL_BODY_SITE, fileName, in);
            
        } catch ( Exception notificationEx) {
            logger.error("Error emailFileData()",
                    notificationEx);
            return swcExceptionResponse(notificationEx.toString());
        }
        
        return Response.status(200).entity("Email sent with attached file").build();

    }
    
}
