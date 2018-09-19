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
import org.codehaus.jackson.JsonParseException;

/**
 *
 * @author UYEN.TRAN
 */
@Provider
public class JsonParseExceptionMapper implements ExceptionMapper<JsonParseException>{

    @Override
    public Response toResponse(JsonParseException exception)
    {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity("This is an invalid json. The request can not be parsed")
                .type( MediaType.APPLICATION_JSON)
                .build();
    }
    
}