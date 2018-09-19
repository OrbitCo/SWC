/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.custom.json;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author UYEN.TRAN
 */

@Provider
public class JsonMappingExceptionMapper implements ExceptionMapper<JsonMappingException >{

    @Override
    public Response toResponse(JsonMappingException exception)
    {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity("This is an invalid request. At least one field format is not readable by the system.")
                .type( MediaType.APPLICATION_JSON)
                .build();
    }
    
}