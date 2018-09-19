package gov.epa.stormwater.model.bls;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import java.util.List;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class BlsCacheModel {
    // key == json from request SeriesPostModel
    // request
    private SeriesPostModel requestModel;
    // response
    private BlsResponseModel responseModel;

    private Long timestamp;

    public BlsCacheModel() {
    }

    public BlsCacheModel(SeriesPostModel requestModel, BlsResponseModel responseModel, Long timestamp) {
        this.requestModel = requestModel;
        this.responseModel = responseModel;
        this.timestamp = timestamp;
    }

    public SeriesPostModel getRequestModel() {
        return requestModel;
    }

    public void setRequestModel(SeriesPostModel requestModel) {
        this.requestModel = requestModel;
    }

    public BlsResponseModel getResponseModel() {
        return responseModel;
    }

    public void setResponseModel(BlsResponseModel responseModel) {
        this.responseModel = responseModel;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
