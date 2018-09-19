/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
//@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class ErrorResponseModel {

    private Integer errorCode;
    private String errorMessage;
    private String errorDesription;
   

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }
    
    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    
     public String getErrorDesription() {
        return errorDesription;
    }

    public void setErrorDesription(String errorDesription) {
        this.errorDesription = errorDesription;
    }
    
}
