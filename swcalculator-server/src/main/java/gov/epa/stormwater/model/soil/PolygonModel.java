/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.soil;

import gov.epa.stormwater.model.XYPairModel;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class PolygonModel {

    private List<XYPairModel> coord = new ArrayList<XYPairModel>();
    private Boolean outer = true;

    public List<XYPairModel> getCoord() {
        return coord;
    }

    public void setCoord(List<XYPairModel> coord) {
        this.coord = coord;
    }

    public Boolean getOuter() {
        return outer;
    }

    public void setOuter(Boolean outer) {
        this.outer = outer;
    }
}
