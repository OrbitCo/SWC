/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.webservice;

import gov.epa.stormwater.model.BaseModel;
import gov.epa.stormwater.model.ErrorResponseModel;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author UYEN.TRAN
 */
public class BaseResource {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    private static final int MAX_PAGE_SIZE = 1000;

    public BaseResource() {

    }

    protected Response databaseExceptionResponse(String message) {

        Response.ResponseBuilder response = Response.serverError();
        response.status(Response.Status.INTERNAL_SERVER_ERROR);
        return response.build();

    }

    protected Response swcExceptionResponse(String description) {

        ErrorResponseModel resp = new ErrorResponseModel();
        resp.setErrorCode(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());        
        resp.setErrorDesription(description);

        Response.ResponseBuilder response = Response.serverError();
        response.status(Response.Status.INTERNAL_SERVER_ERROR);
        response.entity(resp);
        
        return response.build();

    }

    protected Response swcErrorResponse(Status status, String error, String description) {

        ErrorResponseModel resp = new ErrorResponseModel();
        resp.setErrorCode(status.getStatusCode());
        resp.setErrorMessage(error);
        resp.setErrorMessage(description);

        Response.ResponseBuilder response = Response.serverError();
        response.status(status);

        response.entity(resp);

        return response.build();

    }

}
