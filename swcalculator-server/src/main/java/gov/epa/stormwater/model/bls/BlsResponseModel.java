/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.bls;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class BlsResponseModel {

    private String status;
    private String responseTime;
    private List<Object> message;
    private ResultsModel results;
    
    
    private List<DataModel> data;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(String responseTime) {
        this.responseTime = responseTime;
    }   
    
    public List<Object> getMessage() {
        return message;
    }

    public void setMessage(List<Object> message) {
        this.message = message;
    }
    
     @JsonProperty("Results")
    public ResultsModel getResults() {
        return results;
    }
    
    public void setResults(ResultsModel results) {   
           this.results = results;
    }

}
