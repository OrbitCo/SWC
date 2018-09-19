/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.soil;

import gov.epa.stormwater.model.BaseModel;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SoilModel extends BaseModel {

    private String key; // <summary>Unique Key (eg '124246') from SoilDataAccess MuKey property</summary>
    private String area;     // <summary>Area Symbol (eg 'GA089') from SoilDataAccess AreaSymbol property</summary>
    private String symbol;  // <summary>Soil Symbol (eg 'CuC') from SoilDataAccess MuSym property</summary>
    private String hSG;  // <summary>Hydrologic Soil Group (A, B, C or D), blank if not available</summary>
    private Double kSAT_Surface;     // <summary>Saturated Hydraulic Conductivity (micrometers/second) in top horizon</summary>
    private Double kSAT;    // <summary>Saturated Hydraulic Conductivity (micrometers/second) depth weighted</summary>
    private Double slope_R;  // <summary>Representative slope in %</summary>
    private List<SoilLayerModel> layers;     // <summary>Layers associated with soil</summary>
    private List<PolygonModel> polygons;     // <summary>Polygons describing spatial extent of soil</summary>    
    
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getHSG() {
        return hSG;
    }

    public void setHSG(String hSG) {
        this.hSG = hSG;
    }

    public Double getKSAT_Surface() {
        return kSAT_Surface;
    }

    public void setKSAT_Surface(Double kSAT_Surface) {
        this.kSAT_Surface = kSAT_Surface;
    }

    public Double getKSAT() {
        return kSAT;
    }

    public void setKSAT(Double kSAT) {
        this.kSAT = kSAT;
    }

    public Double getSlope_R() {
        return slope_R;
    }

    public void setSlope_R(Double slope_R) {
        this.slope_R = slope_R;
    }

    public List<SoilLayerModel> getLayers() {
        return layers;
    }

    public void setLayers(List<SoilLayerModel> layers) {
        this.layers = layers;
    }

    public List<PolygonModel> getPolygons() {
        return polygons;
    }

    public void setPolygons(List<PolygonModel> polygons) {
        this.polygons = polygons;
    }   
    
}
