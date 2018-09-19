/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author UYEN.TRAN
 */
public class ClimateModel {

    /* TODO - determine output for graphs
      Changed from PointParList fro ZDgrah

     */
    // Data for ZedGraph zgcMonthlyAdjust on MainForm 
    private List<Double> rainDeltaHot = new ArrayList<Double>();  //Hot
    private List<Double> rainDeltaMed = new ArrayList<Double>();  //Med
    private List<Double> rainDeltaWet = new ArrayList<Double>();  //Wet

    private List<Double> evap1 = new ArrayList<Double>();   //Hot
    private List<Double> evap2 = new ArrayList<Double>();   //Med
    private List<Double> evap3 = new ArrayList<Double>();   //Wet
    private List<Double> evap0 = new ArrayList<Double>();   

    // Data for ZedGraph zgcAnnualMaxAdjust on MainForm
    private List<Double> maxRainHot = new ArrayList<Double>();    //Hot
    private List<Double> maxRainMed = new ArrayList<Double>();    //Med
    private List<Double> maxRainWet = new ArrayList<Double>();    //Wet
    private List<Double> maxRainHistorical = new ArrayList<Double>();    //Historical

    /* Move to constants
    public static final String[] MONTH_LABELS
            = //monthLabels =
            {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

    //returnPeriods
    public static final String[] RETURN_PERIODS = {"5", "10", "15", "30", "50", "100"};

    //scenarioNames
    public static final String[] SCENARIO_NAMES = {"None", "Hot/Dry", "Median", "Warm/Wet"};
     */
    public List<Double> getRainDelta1() {
        return rainDeltaHot;
    }

    public void setRainDelta1(List<Double> rainDeltaHot) {
        this.rainDeltaHot = rainDeltaHot;
    }

    public List<Double> getRainDelta2() {
        return rainDeltaMed;
    }

    public void setRainDelta2(List<Double> rainDeltaMed) {
        this.rainDeltaMed = rainDeltaMed;
    }

    public List<Double> getRainDelta3() {
        return rainDeltaWet;
    }

    public void setRainDelta3(List<Double> rainDeltaWet) {
        this.rainDeltaWet = rainDeltaWet;
    }

    public List<Double> getEvap1() {
        return evap1;
    }

    public void setEvap1(List<Double> evap1) {
        this.evap1 = evap1;
    }

    public List<Double> getEvap2() {
        return evap2;
    }

    public void setEvap2(List<Double> evap2) {
        this.evap2 = evap2;
    }

    public List<Double> getEvap3() {
        return evap3;
    }

    public void setEvap3(List<Double> evap3) {
        this.evap3 = evap3;
    }

    public List<Double> getEvap0() {
        return evap0;
    }

    public void setEvap0(List<Double> evap0) {
        this.evap0 = evap0;
    }

    public List<Double> getMaxRain1() {
        return maxRainHot;
    }

    public void setMaxRain1(List<Double> maxRainHot) {
        this.maxRainHot = maxRainHot;
    }

    public List<Double> getMaxRain2() {
        return maxRainMed;
    }

    public void setMaxRain2(List<Double> maxRainMed) {
        this.maxRainMed = maxRainMed;
    }

    public List<Double> getmaxRainHistorical() {
        return maxRainHistorical;
    }

    public void setmaxRainHistorical(List<Double> maxRainHistorical) {
        this.maxRainHistorical = maxRainHistorical;
    }

    public List<Double> getMaxRain3() {
        return maxRainWet;
    }

    public void setMaxRain3(List<Double> maxRainWet) {
        this.maxRainWet = maxRainWet;
    }

}
