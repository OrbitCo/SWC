package gov.epa.stormwater.model;

public class SuccessResponseModel {
    private String message;

    public SuccessResponseModel() {

    }

    public SuccessResponseModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}