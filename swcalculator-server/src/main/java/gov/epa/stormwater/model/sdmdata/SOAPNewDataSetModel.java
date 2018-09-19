/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.sdmdata;

import gov.epa.stormwater.model.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
@XmlRootElement(name="NewDataSet")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class SOAPNewDataSetModel {

    private String saversion;
    private String saverest;
    private String areasymbol;
    private String areaname;
    private String lkey;
    private String musym;
    private String muname;
    private String museq;
    private String mukey;
    private String compname;
    private String slope_r;
    private String comppct_r;
    private String cokey;
    private String hzdept_r;
    private String hzdepb_r;
    private String ksat_r;
    private String chkey;

    public String getSaversion() {
        return saversion;
    }

    public void setSaversion(String saversion) {
        this.saversion = saversion;
    }

    public String getSaverest() {
        return saverest;
    }

    public void setSaverest(String saverest) {
        this.saverest = saverest;
    }

    public String getAreasymbol() {
        return areasymbol;
    }

    public void setAreasymbol(String areasymbol) {
        this.areasymbol = areasymbol;
    }

    public String getAreaname() {
        return areaname;
    }

    public void setAreaname(String areaname) {
        this.areaname = areaname;
    }

    public String getLkey() {
        return lkey;
    }

    public void setLkey(String lkey) {
        this.lkey = lkey;
    }

    public String getMusym() {
        return musym;
    }

    public void setMusym(String musym) {
        this.musym = musym;
    }

    public String getMuname() {
        return muname;
    }

    public void setMuname(String muname) {
        this.muname = muname;
    }

    public String getMuseq() {
        return museq;
    }

    public void setMuseq(String museq) {
        this.museq = museq;
    }

    public String getMukey() {
        return mukey;
    }

    public void setMukey(String mukey) {
        this.mukey = mukey;
    }

    public String getCompname() {
        return compname;
    }

    public void setCompname(String compname) {
        this.compname = compname;
    }

    public String getSslope_r() {
        return slope_r;
    }

    public void setSslope_r(String slope_r) {
        this.slope_r = slope_r;
    }

    public String getComppct_r() {
        return comppct_r;
    }

    public void setComppct_r(String comppct_r) {
        this.comppct_r = comppct_r;
    }

    public String getCokey() {
        return cokey;
    }

    public void setCokey(String cokey) {
        this.cokey = cokey;
    }

    public String getHzdept_r() {
        return hzdept_r;
    }

    public void setHzdept_r(String hzdept_r) {
        this.hzdept_r = hzdept_r;
    }

    public String getHzdepb_r() {
        return hzdepb_r;
    }

    public void setHzdepb_r(String hzdepb_r) {
        this.hzdepb_r = hzdepb_r;
    }

    public String getKsat_r() {
        return ksat_r;
    }

    public void setKsat_r(String ksat_r) {
        this.ksat_r = ksat_r;
    }

    public String getChkey() {
        return chkey;
    }

    public void setChkey(String chkey) {
        this.chkey = chkey;
    }

}
