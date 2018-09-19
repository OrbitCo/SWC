/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.bls;

import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class ResultsModel {

    private List<SeriesModel> series;
    
    
    public List<SeriesModel> getSeries() {
        return series;
    }

    public void setSeries(List<SeriesModel> series) {
        this.series = series;
    }

}
