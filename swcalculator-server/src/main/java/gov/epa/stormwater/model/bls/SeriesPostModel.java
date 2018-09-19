/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.bls;

import gov.epa.stormwater.model.*;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SeriesPostModel {

    private List<String> seriesid = new ArrayList<String> ();
    private String startyear;
    private String endyear;
    private Boolean catalog;
    private Boolean calculations;
    private Boolean annualaverage;
    private String registrationKey;

    public List<String> getSeriesid() {
        return seriesid;
    }

    public void setSeriesid(List<String> seriesid) {
        this.seriesid = seriesid;
    }

    public String getStartyear() {
        return startyear;
    }

    public void setStartyear(String startyear) {
        this.startyear = startyear;
    }

    public String getEndyear() {
        return endyear;
    }

    public void setEndyear(String endyear) {
        this.endyear = endyear;
    }

    public Boolean getCatalog() {
        return catalog;
    }

    public void setCatalog(Boolean catalog) {
        this.catalog = catalog;
    }

    public Boolean getCalculations() {
        return calculations;
    }

    public void setCalculations(Boolean calculations) {
        this.calculations = calculations;
    }

    public Boolean getAnnualaverage() {
        return annualaverage;
    }

    public void setAnnualaverage(Boolean annualaverage) {
        this.annualaverage = annualaverage;
    }

    public String getRegistrationKey() {
        return registrationKey;
    }

    public void setRegistrationKey(String registrationKey) {
        this.registrationKey = registrationKey;
    }

}
