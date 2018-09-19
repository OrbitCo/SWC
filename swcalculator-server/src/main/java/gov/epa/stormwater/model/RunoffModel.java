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
public class RunoffModel {

    /*
      // Variables for Reading SWMM Output
        //const int recdSize = 4;                  // record size in SWMM output file
        public static final int recdSize = 4;                  // record size in SWMM output file
        static FileStream fs;                    // SWMM output file
        static BinaryReader reader;

    static long offset;                      // position of output results (bytes)
    static long totalPeriods;                // number of reporting periods
    static long totalDays;                   // number of reporting days
    static long rptStep;                     // seconds per reporting period

    // Rainfall/runoff Totals
    static double totalRainfall;
    static double totalRunoff;

    // Event Counts
    static int rainDayCount;                 // # days w/ rainfall
    static int runoffDayCount;               // # days w/ runoff
    static String eventCountStr;             // text of runoff event count

    // Daily Runoff Threshold (in)
    //public static double runoffThreshold = 0.10;

    /* MOVED TO OWN CLASS
        // Summary Statistics
        public enum Statistics
        {
            ANNUAL_RAINFALL = 0,
            ANNUAL_RUNOFF = 1,
            RAINFALL_DAYS = 2,
            RUNOFF_DAYS = 3,
            PCT_STORMS_CAP = 4,
            MIN_RUNOFF_DEPTH = 5,
            MAX_CAPTURE_DEPTH = 6,
            MAX_RETENTION = 7,
            COUNT = 8
        }
     */
 /*    
        public static double[] runoffStats;

        // Data for zgcRainRunoff plot on MainForm
        public static PointPairList rainRunoffList;    // rainfall-runoff pairs
        public static PointPairList baseRainRunoffList;

        // Data for zgcRunoffFreq plot on MainForm
        public static PointPairList runoffFreqList;    // runoff - frequency pairs
        public static PointPairList baseRunoffFreqList;

        public static PointPairList rainFreqList;
        public static PointPairList baseRainFreqList;

        // Data for zgcRunoffPcnt plot on MainForm
        public static PointPairList runoffPcntList;   // rain depth interval - runoff pairs
        public static PointPairList baseRunoffPcntList;

        // Data for zgcRainfallCapture plot on MainForm
        public static PointPairList retentionPcntList;
        public static PointPairList baseRetentionPcntList;

        /* Moved to Constants
        // (Make sure following 3 arrays are of equal size)
        public static String[] PcntLabels = { "10", "20", "30", "40", "50", "60", "70",
                                              "75", "80", "85", "90", "95", "99" };
        public static String[] DepthLabels = { "0", "0", "0", "0", "0", "0", "0", "0",
                                               "0", "0", "0", "0", "0" };
        public static double[] PcntValues = { 10, 20, 30, 40, 50, 60, 70, 75, 80, 85, 90, 95, 99 };
 
    // Daily Rainfall and Runoff Results
    static double[] rainDepths;
    static double[] runoffDepths;
    static int[] dryDays;
    static int[] rainIndex;

    // Rainfall Capture Results
    static double minRunoffDepth;  // Min. depth storm producing runoff
    static double maxCaptureDepth; // Max. depth storm fully captured
    static double maxRetention;    // Max. retention over all storms
    static double captureRatio;    // Events Captured / Total Rain Events
    static double captureCoeff;    // Total Rain Captured / Total Rain
     */
    // Annual water budget variables
    private Double annualRainfall = new Double(0);     // annual rainfall (inches)
    private Double annualRunoff = new Double(0);       // annual runoff (inches)
    private Double annualInfil = new Double(0);        // annual infiltration (inches)
    private Double annualEvap = new Double(0);         // annual evaporation (inches)

    private Long offset;                      // position of output results (bytes)
    private Long totalPeriods;                // number of reporting periods
    private Long totalDays;                   // number of reporting days
    private Long rptStep;                     // seconds per reporting period

    private Double totalRainfall = (double) 0;
    private Double totalRunoff = (double) 0;
    private Integer rainDayCount = 0;                 // # days w/ rainfall
    private Integer runoffDayCount = (Integer) 0;               // # days w/ runoff
    private String eventCountStr;             // text of runoff event count

    // Daily Rainfall and Runoff Results
    private Double[] rainDepths;
    private Double[] runoffDepths;
    private Integer[] dryDays;
    private Integer[] rainIndex;
    private Double minRunoffDepth = (double) 0;  // Min. depth storm producing runoff
    private Double maxCaptureDepth = (double) 0; // Max. depth storm fully captured
    private Double maxRetention = (double) 0;    // Max. retention over all storms
    private Double captureRatio = (double) 0;    // Events Captured / Total Rain Events
    private Double captureCoeff = (double) 0;    // Total Rain Captured / Total Rain

    // Daily Runoff Threshold (in)
    //private Double runoffThreshold = 0.10;    //This is in SiteDataModel.runOffThreshold
    //---------------------------------------------------------------------------------------
    private List<Double> runoffStats = new ArrayList<Double>();
    private List<XYPairModel> rainRunoffList = new ArrayList<XYPairModel>();
    private List<XYPairModel> runoffPcntList = new ArrayList<XYPairModel>();
    private List<XYPairModel> retentionPcntList = new ArrayList<XYPairModel>();
    private List<XYPairModel> runoffFreqList = new ArrayList<XYPairModel>();
    private List<XYPairModel> rainFreqList = new ArrayList<XYPairModel>();
    
    // (Make sure following 3 arrays are of equal size)
    public static final String[] RUNOFF_PCNT_LABELS = {"10", "20", "30", "40", "50", "60", "70",
        "75", "80", "85", "90", "95", "99"};
    public String[] runoffDepthLabels = {"0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0"};
    public static final Double[] RUNOFF_PCNT_VALUES = {10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0, 75.0, 80.0, 85.0, 90.0, 95.0, 99.0};


    
    /* TODO
        static Runoff()
        {
            int n = (int)Statistics.COUNT;
            runoffStats = new Double[n];
        }    
     */
    public Double getAnnualRainfall() {
        return annualRainfall;
    }

    public void setAnnualRainfall(Double annualRainfall) {
        this.annualRainfall = annualRainfall;
    }

    public Double getAnnualRunoff() {
        return annualRunoff;
    }

    public void setAnnualRunoff(Double annualRunoff) {
        this.annualRunoff = annualRunoff;
    }

    public Double getAnnualInfil() {
        return annualInfil;
    }

    public void setAnnualInfil(Double annualInfil) {
        this.annualInfil = annualInfil;
    }

    public Double getAnnualEvap() {
        return annualEvap;
    }

    public void setAnnualEvap(Double annualEvap) {
        this.annualEvap = annualEvap;
    }

    public Long getOffset() {
        return offset;
    }

    public void setOffset(Long offset) {
        this.offset = offset;
    }

    public Long getTotalPeriods() {
        return totalPeriods;
    }

    public void setTotalPeriods(Long totalPeriods) {
        this.totalPeriods = totalPeriods;
    }

    public Long getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(Long totalDays) {
        this.totalDays = totalDays;
    }

    public Long getRptStep() {
        return rptStep;
    }

    public void setRptStep(Long rptStep) {
        this.rptStep = rptStep;
    }

    public Double getTotalRainfall() {
        return totalRainfall;
    }

    public void setTotalRainfall(Double totalRainfall) {
        this.totalRainfall = totalRainfall;
    }

    public Double getTotalRunoff() {
        return totalRunoff;
    }

    public void setTotalRunoff(Double totalRunoff) {
        this.totalRunoff = totalRunoff;
    }

    public Integer getRainDayCount() {
        return rainDayCount;
    }

    public void setRainDayCount(Integer rainDayCount) {
        this.rainDayCount = rainDayCount;
    }

    public Integer getRunoffDayCount() {
        return runoffDayCount;
    }

    public void setRunoffDayCount(Integer runoffDayCount) {
        this.runoffDayCount = runoffDayCount;
    }

    public String getEventCountStr() {
        return eventCountStr;
    }

    public void setEventCountStr(String eventCountStr) {
        this.eventCountStr = eventCountStr;
    }

    public Double[] getRainDepths() {
        return rainDepths;
    }

    public void setRainDepths(Double[] rainDepths) {
        this.rainDepths = rainDepths;
    }

    public Double[] getRunoffDepths() {
        return runoffDepths;
    }

    public void setRunoffDepths(Double[] runoffDepths) {
        this.runoffDepths = runoffDepths;
    }

    public Integer[] getDryDays() {
        return dryDays;
    }

    public void setDryDays(Integer[] dryDays) {
        this.dryDays = dryDays;
    }

    public Integer[] getRainIndex() {
        return rainIndex;
    }

    public void setRainIndex(Integer[] rainIndex) {
        this.rainIndex = rainIndex;
    }

    public Double getMinRunoffDepth() {
        return minRunoffDepth;
    }

    public void setMinRunoffDepth(Double minRunoffDepth) {
        this.minRunoffDepth = minRunoffDepth;
    }

    public Double getMaxCaptureDepth() {
        return maxCaptureDepth;
    }

    public void setMaxCaptureDepth(Double maxCaptureDepth) {
        this.maxCaptureDepth = maxCaptureDepth;
    }

    public Double getMaxRetention() {
        return maxRetention;
    }

    public void setMaxRetention(Double maxRetention) {
        this.maxRetention = maxRetention;
    }

    public Double getCaptureRatio() {
        return captureRatio;
    }

    public void setCaptureRatio(Double captureRatio) {
        this.captureRatio = captureRatio;
    }

    public Double getCaptureCoeff() {
        return captureCoeff;
    }

    public void setCaptureCoeff(Double captureCoeff) {
        this.captureCoeff = captureCoeff;
    }

    /* in SiteDataModel and comes from UI 
    public Double getRunoffThreshold() {
        return runoffThreshold;
    }

    public void setRunoffThreshold(Double captureCoeff) {
        this.runoffThreshold = runoffThreshold;
    }
     */
    public List<Double> getRunoffStats() {
        return runoffStats;
    }

    public void setRunoffStats(List<Double> runoffStats) {
        this.runoffStats = runoffStats;

    }
    
    public List<XYPairModel> getRainRunoffList() {
        return rainRunoffList;
    }

    public void setRainRunoffList(List<XYPairModel> rainRunoffList) {
        this.rainRunoffList = rainRunoffList;

    }   
    
    
    public List<XYPairModel> getRunoffPcntList() {
        return runoffPcntList;
    }

    public void setRunoffPcntList(List<XYPairModel> runoffPcntList) {
        this.runoffPcntList = runoffPcntList;

    }       
               
    public List<XYPairModel> getRetentionPcntList() {
        return retentionPcntList;
    }

    public void setRetentionPcntListList(List<XYPairModel> runoffPcntList) {
        this.retentionPcntList = retentionPcntList;
    } 
    
     public List<XYPairModel> getRunoffFreqList() {
        return runoffFreqList;
    }

    public void setRunoffFreqList(List<XYPairModel> runoffFreqList) {
        this.runoffFreqList = runoffFreqList;
    }    
    
    
         public List<XYPairModel> getRainFreqList() {
        return rainFreqList;
    }

    public void setRainFreqList(List<XYPairModel> rainFreqList) {
        this.rainFreqList = rainFreqList;
    }  
    
            
    /*
    public String[] getRunoffDepthLabels() {
        return runoffDepthLabels;
    }

    public void setRunoffDepthLabels(String[] unoffDepthLabels) {
        this.runoffDepthLabels = runoffDepthLabels;
    }
    */
}