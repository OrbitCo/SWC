/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.soil;

import gov.epa.stormwater.model.BaseModel;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SoilMapPolygonModel extends BaseModel {

    //private Double[] lat;
    //private Double[] lng;
    private Double kSat;
    private Double slope;
    private String soilGroup;
    private List<PolygonModel> polygons; 
    
/*
    public Double[] getLat() {
        return lat;
    }

    public void setLat(Double[] lat) {
        this.lat = lat;
    }

    public Double[] getLng() {
        return lng;
    }

    public void setLng(Double[] lng) {
        this.lng = lng;
    }
*/
    public Double getKSat() {
        return kSat;
    }

    public void setKSat(Double kSat) {
        this.kSat = kSat;
    }

    public Double getSlope() {
        return slope;
    }

    public void setSlope(Double slope) {
        this.slope = slope;
    }

    public String getSoilGroup() {
        return soilGroup;
    }

    public void setSoilGroup(String soilGroup) {
        this.soilGroup = soilGroup;
    }
    
    public List<PolygonModel> getPolygons() {
        return polygons;
    }

    public void setPolygons(List<PolygonModel> polygons) {
        this.polygons = polygons;
    }     

}
