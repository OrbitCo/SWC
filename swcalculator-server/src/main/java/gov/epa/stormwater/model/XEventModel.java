/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class XEventModel {

    // Extreme event return periods
    public static final String[] RETURN_PERIOD = {"5", "10", "15", "30", "50", "100"};
    public static final Integer N_EVENTS = RETURN_PERIOD.length;

    private Double[] rainfall = new Double[N_EVENTS];
    private Double[] runoff = new Double[N_EVENTS];
    private Double[] peakRainfall = new Double[N_EVENTS];
    private Double[] peakRunoff = new Double[N_EVENTS];
    //Use this as temp holder to pass values around
    private Double peakRainfallOne;
    private Double peakRunoffOne;

    // Data for extreme event runoff plot (zgcExtremeEvent plot on MainForm)
    private List<Double> extremeRainfallList;
    private List<Double> extremeRunoffList;
    private List<Double> baseExtremeRainfallList;
    private List<Double> baseExtremeRunoffList;

    // Data for peak runoff plot (zgcExtremePeak plot on MainForm)
    private List<Double> peakRainfallList;
    private List<Double> peakRunoffList;
    private List<Double> basePeakRainfallList;
    private List<Double> basePeakRunoffList;

    // SCS 24-hour design storm distributions
    private Double[] scsI = new Double[241];
    private Double[] scsIa = new Double[241];
    private Double[] scsII = new Double[241];
    private Double[] scsIII = new Double[241];

    public Double[] getRainfall() {
        return rainfall;
    }

    public void setRainfall(Double[] rainfall) {
        this.rainfall = rainfall;
    }

    public Double[] getRunoff() {
        return runoff;
    }

    public void setRunoff(Double[] runoff) {
        this.runoff = runoff;
    }

    public Double[] getPeakRainfall() {
        return peakRainfall;
    }

    public void setPeakRainfall(Double[] peakRainfall) {
        this.peakRainfall = peakRainfall;
    }

    public Double[] getPeakRunoff() {
        return peakRunoff;
    }

    public void setPeakRunoff(Double[] peakRunoff) {
        this.peakRunoff = peakRunoff;
    }

    public Double getPeakRainfallOne() {
        return peakRainfallOne;
    }

    public void setPeakRainfallOne(Double peakRainfallOne) {
        this.peakRainfallOne = peakRainfallOne;
    }

    public Double getPeakRunoffOne() {
        return peakRunoffOne;
    }

    public void setPeakRunoffOne(Double peakRunoffOne) {
        this.peakRunoffOne = peakRunoffOne;
    }
    
    public List<Double> getExtremeRainfallList() {
        return extremeRainfallList;
    }

    public void setExtremeRainfallList(List<Double> extremeRainfallList) {
        this.extremeRainfallList = extremeRainfallList;
    }

    public List<Double> getExtremeRunoffList() {
        return extremeRunoffList;
    }

    public void setExtremeRunoffList(List<Double> extremeRunoffList) {
        this.extremeRunoffList = extremeRunoffList;
    }

    public List<Double> getBaseExtremeRainfallList() {
        return baseExtremeRainfallList;
    }

    public void setBaseExtremeRainfallList(List<Double> baseExtremeRainfallList) {
        this.baseExtremeRainfallList = baseExtremeRainfallList;
    }

    public List<Double> getBaseExtremeRunoffList() {
        return baseExtremeRunoffList;
    }

    public void setBaseExtremeRunoffList(List<Double> baseExtremeRunoffList) {
        this.baseExtremeRunoffList = baseExtremeRunoffList;
    }

    public List<Double> getPeakRainfallList() {
        return peakRainfallList;
    }

    public void setPeakRainfallList(List<Double> peakRainfallList) {
        this.peakRainfallList = peakRainfallList;
    }

    public List<Double> getPeakRunoffList() {
        return peakRunoffList;
    }

    public void setPeakRunoffList(List<Double> peakRunoffList) {
        this.peakRunoffList = peakRunoffList;
    }

    public List<Double> getBasePeakRainfallList() {
        return basePeakRainfallList;
    }

    public void setBasePeakRainfallList(List<Double> basePeakRainfallList) {
        this.basePeakRainfallList = basePeakRainfallList;
    }

    public List<Double> getBasePeakRunoffList() {
        return basePeakRunoffList;
    }

    public void setBasePeakRunoffList(List<Double> basePeakRunoffList) {
        this.basePeakRunoffList = basePeakRunoffList;
    }

    public Double[] getScsI() {
        return scsI;
    }

    public void setScsI(Double[] scsI) {
        this.scsI = scsI;
    }

    public Double[] getScsIa() {
        return scsIa;
    }

    public void setScsIa(Double[] scsIa) {
        this.scsIa = scsIa;
    }

    public Double[] getScsII() {
        return scsII;
    }

    public void setScsII(Double[] scsII) {
        this.scsII = scsII;
    }

    public Double[] getScsIII() {
        return scsIII;
    }

    public void setScsIII(Double[] scsIII) {
        this.scsIII = scsIII;
    }

}
