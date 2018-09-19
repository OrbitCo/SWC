/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import java.io.BufferedWriter;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */

@XmlRootElement(name="lidData")
@XmlAccessorType(XmlAccessType.PROPERTY)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class LidModel {

    // Impervious Disconnection
    private BigDecimal idCapture = BigDecimal.valueOf(100);

    // Rainwater Harvesting
    private BigDecimal rhSize = BigDecimal.valueOf(100);
    private BigDecimal rhDrainRate = BigDecimal.valueOf(50);
    private BigDecimal rhNumber = BigDecimal.valueOf(4);

    // Rain Garden
    private BigDecimal rgRimHeight = BigDecimal.valueOf(6);
    private BigDecimal rgSoilHeight = BigDecimal.valueOf(12);
    private BigDecimal rgSoilPorosity = BigDecimal.valueOf(45);
    private BigDecimal rgSoilKsat = BigDecimal.valueOf(10);
    private BigDecimal rgCapture = BigDecimal.valueOf(5);
    private boolean rgHasPreTreat = false; //cost module addition to indicate presence / absence of pretreatment

    // Green Roof
    private BigDecimal grSoilHeight = BigDecimal.valueOf(4);
    private BigDecimal grSoilPorosity = BigDecimal.valueOf(45);
    private BigDecimal grSoilKsat = BigDecimal.valueOf(10);
    private BigDecimal grDrainHeight = BigDecimal.valueOf(2);
    private BigDecimal grDrainVoid = BigDecimal.valueOf(75);

    // Street Planter
    private BigDecimal spRimHeight = BigDecimal.valueOf(6);
    private BigDecimal spSoilHeight = BigDecimal.valueOf(18);
    private BigDecimal spSoilPorosity = BigDecimal.valueOf(45);
    private BigDecimal spSoilKsat = BigDecimal.valueOf(10);
    private BigDecimal spDrainHeight = BigDecimal.valueOf(12);
    private BigDecimal spDrainVoid = BigDecimal.valueOf(75);
    private BigDecimal spCapture = BigDecimal.valueOf(6);

    // Infiltration Basin
    private BigDecimal ibHeight = BigDecimal.valueOf(6);
    private BigDecimal ibCapture = BigDecimal.valueOf(5);
    private boolean ibHasPreTreat = false; //cost module addition to indicate presence / abscence of pretreatment

    // Porous Pavement
    private BigDecimal ppPaveHeight = BigDecimal.valueOf(6);
    private BigDecimal ppPaveVoid = BigDecimal.valueOf(12);
    private BigDecimal ppDrainHeight = BigDecimal.valueOf(18);
    private BigDecimal ppDrainVoid = BigDecimal.valueOf(75);
    private BigDecimal ppCapture = BigDecimal.valueOf(100);

    private boolean ppHasPreTreat = false; //cost module addition to indicate presence / abscence of pretreatment

    public BigDecimal getIdCapture() {
        return idCapture ;
    }

    public void setIdCapture(BigDecimal idCapture) {
        this.idCapture=idCapture;
    }
    public BigDecimal getRhSize() {
        return rhSize ;
    }

    public void setRhSize(BigDecimal rhSize) {
        this.rhSize=rhSize;
    }
    public BigDecimal getRhDrainRate() {
        return rhDrainRate ;
    }

    public void setRhDrainRate(BigDecimal rhDrainRate) {
        this.rhDrainRate=rhDrainRate;
    }
    public BigDecimal getRhNumber() {
        return rhNumber ;
    }

    public void setRhNumber(BigDecimal rhNumber) {
        this.rhNumber=rhNumber;
    }
    public BigDecimal getRgRimHeight() {
        return rgRimHeight ;
    }

    public void setRgRimHeight(BigDecimal rgRimHeight) {
        this.rgRimHeight=rgRimHeight;
    }
    public BigDecimal getRgSoilHeight() {
        return rgSoilHeight ;
    }

    public void setRgSoilHeight(BigDecimal rgSoilHeight) {
        this.rgSoilHeight=rgSoilHeight;
    }
    public BigDecimal getRgSoilPorosity() {
        return rgSoilPorosity ;
    }

    public void setRgSoilPorosity(BigDecimal rgSoilPorosity) {
        this.rgSoilPorosity=rgSoilPorosity;
    }
    public BigDecimal getRgSoilKsat() {
        return rgSoilKsat ;
    }

    public void setRgSoilKsat(BigDecimal rgSoilKsat) {
        this.rgSoilKsat=rgSoilKsat;
    }
    public BigDecimal getRgCapture() {
        return rgCapture ;
    }

    public void setRgCapture(BigDecimal rgCapture) {
        this.rgCapture=rgCapture;
    }
    public boolean getRgHasPreTreat() {
        return rgHasPreTreat ;
    }

    public void setRgHasPreTreat(boolean rgHasPreTreat) {
        this.rgHasPreTreat=rgHasPreTreat;
    }
    public BigDecimal getGrSoilHeight() {
        return grSoilHeight ;
    }

    public void setGrSoilHeight(BigDecimal grSoilHeight) {
        this.grSoilHeight=grSoilHeight;
    }
    public BigDecimal getGrSoilPorosity() {
        return grSoilPorosity ;
    }

    public void setGrSoilPorosity(BigDecimal grSoilPorosity) {
        this.grSoilPorosity=grSoilPorosity;
    }
    public BigDecimal getGrSoilKsat() {
        return grSoilKsat ;
    }

    public void setGrSoilKsat(BigDecimal grSoilKsat) {
        this.grSoilKsat=grSoilKsat;
    }
    public BigDecimal getGrDrainHeight() {
        return grDrainHeight ;
    }

    public void setGrDrainHeight(BigDecimal grDrainHeight) {
        this.grDrainHeight=grDrainHeight;
    }
    public BigDecimal getGrDrainVoid() {
        return grDrainVoid ;
    }

    public void setGrDrainVoid(BigDecimal grDrainVoid) {
        this.grDrainVoid=grDrainVoid;
    }
    public BigDecimal getSpRimHeight() {
        return spRimHeight ;
    }

    public void setSpRimHeight(BigDecimal spRimHeight) {
        this.spRimHeight=spRimHeight;
    }
    public BigDecimal getSpSoilHeight() {
        return spSoilHeight ;
    }

    public void setSpSoilHeight(BigDecimal spSoilHeight) {
        this.spSoilHeight=spSoilHeight;
    }
    public BigDecimal getSpSoilPorosity() {
        return spSoilPorosity ;
    }

    public void setSpSoilPorosity(BigDecimal spSoilPorosity) {
        this.spSoilPorosity=spSoilPorosity;
    }
    public BigDecimal getSpSoilKsat() {
        return spSoilKsat ;
    }

    public void setSpSoilKsat(BigDecimal spSoilKsat) {
        this.spSoilKsat=spSoilKsat;
    }
    public BigDecimal getSpDrainHeight() {
        return spDrainHeight ;
    }

    public void setSpDrainHeight(BigDecimal spDrainHeight) {
        this.spDrainHeight=spDrainHeight;
    }
    public BigDecimal getSpDrainVoid() {
        return spDrainVoid ;
    }

    public void setSpDrainVoid(BigDecimal spDrainVoid) {
        this.spDrainVoid=spDrainVoid;
    }
    public BigDecimal getSpCapture() {
        return spCapture ;
    }

    public void setSpCapture(BigDecimal spCapture) {
        this.spCapture=spCapture;
    }
    public BigDecimal getIbHeight() {
        return ibHeight ;
    }

    public void setIbHeight(BigDecimal ibHeight) {
        this.ibHeight=ibHeight;
    }
    public BigDecimal getIbCapture() {
        return ibCapture ;
    }

    public void setIbCapture(BigDecimal ibCapture) {
        this.ibCapture=ibCapture;
    }
    public boolean getIbHasPreTreat() {
        return ibHasPreTreat ;
    }

    public void setIbHasPreTreat(boolean ibHasPreTreat) {
        this.ibHasPreTreat=ibHasPreTreat;
    }
    public BigDecimal getPpPaveHeight() {
        return ppPaveHeight ;
    }

    public void setPpPaveHeight(BigDecimal ppPaveHeight) {
        this.ppPaveHeight=ppPaveHeight;
    }
    public BigDecimal getPpPaveVoid() {
        return ppPaveVoid ;
    }

    public void setPpPaveVoid(BigDecimal ppPaveVoid) {
        this.ppPaveVoid=ppPaveVoid;
    }
    public BigDecimal getPpDrainHeight() {
        return ppDrainHeight ;
    }

    public void setPpDrainHeight(BigDecimal ppDrainHeight) {
        this.ppDrainHeight=ppDrainHeight;
    }
    public BigDecimal getPpDrainVoid() {
        return ppDrainVoid ;
    }

    public void setPpDrainVoid(BigDecimal ppDrainVoid) {
        this.ppDrainVoid=ppDrainVoid;
    }
    public BigDecimal getPpCapture() {
        return ppCapture ;
    }

    public void setPpCapture(BigDecimal ppCapture) {
        this.ppCapture=ppCapture;
    }
    public boolean getPpHasPreTreat() {
        return ppHasPreTreat ;
    }

    public void setPpHasPreTreat(boolean ppHasPreTreat) {
        this.ppHasPreTreat=ppHasPreTreat;
    }
    
}
