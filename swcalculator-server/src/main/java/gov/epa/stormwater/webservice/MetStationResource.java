package gov.epa.stormwater.webservice;

/**
 *
 * @author UYEN.TRAN
 */


import gov.epa.stormwater.model.met.MetStationModel;
import gov.epa.stormwater.model.met.PrecStationLocationModel;
import gov.epa.stormwater.model.soil.SoilModel;
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
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

@Component
@Path("/v1/metStations")
@Api(tags = "MET Stations")
public class MetStationResource extends BaseResource {
    
    @Autowired
    private GeoDataService geoDataService;

    @Autowired
    private SoapService soapService;
    
    @Autowired
    private SsurgoService ssurgoService;

         @GET
    //@Path("/precipStations")   
    @ApiOperation(value = "Precip and Evap Data", notes = "Returns 5 closets stations for precip & evap", response = PrecStationLocationModel.class
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
            logger.error("Error getPrecipClosest()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(output).build();
    }
 
    
    @GET
    @ApiOperation(value = "Download Precip Data File", notes = "THIS DOES NOT WORK FROM SWAGGER UI (does not seem to support download) "
    )
    @Path("/download/precipData/{precStationID}")
    @Produces("application/txt")
    public Response downloadPrecipData(            
            @ApiParam(value = "precStationID", required = true)
            @PathParam("precStationID") String precStationID
    ) {

        Response.ResponseBuilder response = null;       
        byte[] output = null;

        try {
            output = geoDataService.downloadRainfallData(precStationID);
            String sFileName = "Rain - " + precStationID + ".dat";
            response = Response.ok(output);
            response.header("Content-Disposition",           
            "attachment; filename=" + sFileName);
        } catch (SWCException e) {
            logger.error("Error downloadPrecipData()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        return response.build();

    }    
    
    @GET
    @ApiOperation(value = "Download Evap Data File", notes = "THIS DOES NOT WORK FROM SWAGGER UI (does not seem to support download) "
    )
    @Path("/download/evapData/{evapStationID}")
    @Produces("application/txt")
    public Response downloadEvapData(            
        @ApiParam(value = "evapStationID", required = true)
        @PathParam("evapStationID") String evapStationID,
        @ApiParam(value = "Evap Station Name.  Used as part of file name.", required = false)
        @QueryParam("staNam") String staNam         
    ) {

        Response.ResponseBuilder response = null;       
        byte[] output = null;

        try {
            output = geoDataService.downloadEvapData(evapStationID);
            String sFileName = "Evap - " ;
            if (staNam != null && staNam.trim() != "") {
                sFileName = sFileName + staNam;
            }else{
                sFileName = sFileName + evapStationID;
            }
            sFileName = sFileName + ".dat";            
            response = Response.ok(output);
            response.header("Content-Disposition",           
            "attachment; filename=" + sFileName);
        } catch (SWCException e) {
            logger.error("Error downloadEvapData()",
                    e);            
            return swcExceptionResponse(e.toString());
        }
        
        return response.build();

    }    
    
    
    
}
