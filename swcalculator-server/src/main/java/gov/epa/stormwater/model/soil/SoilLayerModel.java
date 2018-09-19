/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.soil;

import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class SoilLayerModel {

    private Double depthToTop;
    private Double depthToBottom;
    private Double kSAT;
    private String hSG;
    private Double slope_R;
    private Integer compPct_R;

    public Double getDepthToTop() {
        return depthToTop;
    }

    public void setDepthToTop(Double depthToTop) {
        this.depthToTop = depthToTop;
    }

    public Double getDepthToBottom() {
        return depthToBottom;
    }

    public void setDepthToBottom(Double depthToBottom) {
        this.depthToBottom = depthToBottom;
    }

    public Double getKSAT() {
        return kSAT;
    }

    public void setKSAT(Double kSAT) {
        this.kSAT = kSAT;
    }

    public String getHSG() {
        return hSG;
    }

    public void setHSG(String hSG) {
        this.hSG = hSG;
    }

    public Double getSlope_R() {
        return slope_R;
    }

    public void setSlope_R(Double slope_R) {
        this.slope_R = slope_R;
    }

    public Integer getCompPct_R() {
        return compPct_R;
    }

    public void setCompPct_R(Integer compPct_R) {
        this.compPct_R = compPct_R;
    }

}
