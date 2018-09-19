/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import com.google.common.io.LittleEndianDataInputStream;
import gov.epa.stormwater.model.RunoffModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.model.XEventModel;
import gov.epa.stormwater.model.XYPairModel;
import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.model.met.PrecStationLocationModel;
import static gov.epa.stormwater.service.GeoDataServiceImpl.MAX_MET_STATIONS;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 *
 * @author UYEN.TRAN
 */
@Service("runoffService")
public class RunoffServiceImpl implements RunoffService {

    private static Logger logger = LoggerFactory
            .getLogger(RunoffServiceImpl.class);

    @Override
    public RunoffModel getWaterBudget(int years, String rptFile) throws SWCException {
        RunoffModel output = new RunoffModel();
        /* Set these default values in the class  
            rainfall = (double) 0;
            runoff = (double) 0;
            infil = (double) 0;
            evap = (double) 0;
         */
        Double runoff = (double) 0;
        
        String line;
        double factor = 12.0 / Constants.SITE_DATA_AREA / years;

        BufferedReader bufReader = new BufferedReader(new StringReader(Utils.readSWCFile(rptFile)));
        try {
            while ((line = bufReader.readLine()) != null) {
                if (line == null) {
                    //return output;
                    return output;
                }
                if (line.contains("  Total Precipitation")) {
                    output.setAnnualRainfall(getValueFromLine(line) * factor);
                    output.setAnnualEvap(getValueFromLine(bufReader.readLine()) * factor);
                    output.setAnnualInfil(getValueFromLine(bufReader.readLine()) * factor);
                }
                if (line.contains("  External Outflow")) {
                   runoff += getValueFromLine(line) * factor;
                   runoff += getValueFromLine(bufReader.readLine()) * factor;
                    //output.setAnnualRunoff(output.getAnnualRunoff() + (getValueFromLine(line) * factor));
                    //output.setAnnualRunoff(output.getAnnualRunoff() + (getValueFromLine(bufReader.readLine()) * factor));
                    output.setAnnualRunoff(runoff);
                }

                if (line.contains("  Seepage Loss")) {
                    output.setAnnualInfil(output.getAnnualInfil() + (getValueFromLine(line) * factor));
                    break;
                }
            }
            bufReader.close();

        } catch (Exception ex) {
            logger.error("RunOffServiceImpl.getWaterBudget error: " + ex.getMessage());
            throw new SWCException(ex.getMessage());
        }

        return output;

    }

    private static double getValueFromLine(String line) {

        //string[] words = line.Split(default(Char[]), StringSplitOptions.RemoveEmptyEntries);
        String[] words = line.split("\\s+");
        if (words.length <= 3) {
            return 0;
        }
        return Double.valueOf(words[4]);    //desk app has 3, but we are changing to 4
    }

    @Override
    // Open the SWMM binary output file and create a reader for it
    public int getStats(String outFile, SiteData siteData) throws SWCException, IOException {

        int result = 1;

        File f = new File(outFile);
        FileInputStream fis = null;
        FileInputStream fis2 = null;
        LittleEndianDataInputStream ldis = null;
        LittleEndianDataInputStream ldis2 = null;

        int mit = 0;

        try {

            //Create 2 instances b/c LittleEndianDataInputStream didn't seem as it could be read twice
            fis = new FileInputStream(f);
            fis2 = new FileInputStream(f);
            ldis = new LittleEndianDataInputStream(fis);
            ldis2 = new LittleEndianDataInputStream(fis2);

            // Check that the file is complete
            if (outFileComplete(f, ldis, siteData)) {
                // Read the contents of the file
                //send new ldis of same file b/c when using same ldis, seems like pointer                 
                readOutFile(ldis2, siteData);
                siteData.getRunoffModel().setTotalRunoff(Math.min(siteData.getRunoffModel().getTotalRunoff(), siteData.getRunoffModel().getTotalRainfall()));

                // Determine mean inter-event time (MIT) to use for counting rainfall events                
                if (siteData.getIgnoreConsecStorms()) {
                    mit = 2;
                }
            }

            // Populate rainfall - runoff plot
            createRainRunoffPlot(mit, siteData.getRunoffModel(), siteData);

            // Compute runoff by storm size plot 
            createRainIntervalPlot(mit, siteData.getRunoffModel(), siteData);

            // Compute retention frequency plot
            createRetentionPcntPlot(mit, siteData.getRunoffModel(), siteData);

            // Compute runoff frequency plot
            siteData.getRunoffModel().setRunoffDayCount(createRunoffFreqPlot(mit, siteData.getRunoffModel(), siteData));

            // Compute summary statistics
            computeSummaryStats(mit, siteData.getRunoffModel(), siteData);
            result = 0;

        } catch (Exception ex) {
            // if any error occurs
            ex.printStackTrace();
            logger.error("runoffService.getStats:" + ex.getMessage());
            throw new SWCException("Error running runoff stats: " + ex.getMessage());
        } finally {
            fis.close();
            fis2.close();
            ldis.close();
            ldis2.close();
        }

        return result;

    }

    private boolean outFileComplete(File f, LittleEndianDataInputStream ldis, SiteData siteData) throws SWCException, IOException {

        // try {
        if (f.length() > 20) {
            /* 
            //Cannot use RandomAccesFile
            //.NET ReadInt32 = little endian while java reatInt = big endian so it is NOT the same!!!! 
         
            RandomAccessFile raf = new RandomAccessFile(outFile, "r");
            logger.debug("UYEN raf Length: " + raf.length());
             raf.seek(position); 
            long endPosition = raf.length();    //the length of this file, measured in bytes.
             */

            long endPosition = f.length();    //the length of this file, measured in bytes.
            logger.debug("f.length: " + f.length());

            // Position file pointer to 4 records before the end of the file
            //fs.Seek(-4 * recdSize, SeekOrigin.End);   
            //can't go backwards, so calculate position we want to move to
            long position = endPosition - (4 * Constants.RECD_SZ);
            ldis.skip(position);

            // Read byte offset where time series results begin
            //offset = reader.ReadInt32();
            int offset = ldis.readInt();    //raf.readInt();
            siteData.getRunoffModel().setOffset((long) offset);
            logger.debug("offset: " + siteData.getRunoffModel().getOffset());

            // Read total number of reporting periods
            int totalPeriods = ldis.readInt();  //raf.readInt();
            siteData.getRunoffModel().setTotalPeriods((long) totalPeriods);
            logger.debug("number of periods: " + siteData.getRunoffModel().getTotalPeriods());

            // Check for SWMM errors
            int errorCode = ldis.readInt();  //reader.ReadInt32();
            int magic2 = ldis.readInt();//reader.ReadInt32();
            if (magic2 == 516114522
                    && errorCode == 0 && siteData.getRunoffModel().getTotalPeriods() > 0) {
                return true;
            }
            return false;
        }
        /*} catch (Exception ex) {
            // if any error occurs
            ex.printStackTrace();
            logger.error("runoffService.outFileComplete:" + ex.getMessage());
            throw new SWCException("Error running runoff stats: " + ex.getMessage());
        }*/
        return false;
    }

    private void readOutFile(LittleEndianDataInputStream ldis2, SiteData siteData) throws IOException {

        long periods = 0;               // current reporting time period
        double theDate;                 // date/time as double
        double currentDay = 0.0;        // current date portion of Date/Time
        double previousDay = 0.0;       // date of previous rain day
        double rainfall;                // rainfall (in/hr)
        double runoff;                  // runoff (cfs)
        double depth;                   // runoff depth (in)
        double dailyRainfall = 0.0;     // day's rainfall (in)
        double dailyRunoff = 0.0;       // day's runoff (in)
        double cfsToIn;                 // conversion from cfs to in

        RunoffModel runoffModel = siteData.getRunoffModel();

        double totalRunoff = runoffModel.getTotalRunoff();
        double totalRainfall = runoffModel.getTotalRainfall();

        // Move file pointer 1 record before start of output results
        //fs.Seek(offset - recdSize, SeekOrigin.Begin);
        ldis2.skip(runoffModel.getOffset() - Constants.RECD_SZ);

        // Read reporting step
        //rptStep = reader.ReadInt32();        
        //cfsToIn = rptStep * 12.0 / SiteData.area / 43560.0;        
        runoffModel.setRptStep((long) ldis2.readInt());
        cfsToIn = runoffModel.getRptStep() * 12 / Constants.SITE_DATA_AREA / 43560.0;

        // Create arrays to hold daily rainfall & runoff totals
        long totalDays = runoffModel.getTotalPeriods() * runoffModel.getRptStep() / 86400;
        runoffModel.setTotalDays(totalDays);

        //Local vars for ease of use, but will be copied to model at end
        Double[] runoffDepths = new Double[(int) totalDays];
        Arrays.fill(runoffDepths, new Double(0));    //have to initialize to 0 otherwise null
        Double[] rainDepths = new Double[(int) totalDays];
        Arrays.fill(rainDepths, new Double(0));    //have to initialize to 0 otherwise null
        Integer[] dryDays = new Integer[(int) totalDays];
        Arrays.fill(dryDays, new Integer(0));    //have to initialize to 0 otherwise null
        Integer[] rainIndex = new Integer[(int) totalDays];
        Arrays.fill(rainIndex, new Integer(0));    //have to initialize to 0 otherwise null

        Integer rainDayCount = runoffModel.getRainDayCount();        
        // Read output for each reporting period
        while (periods < runoffModel.getTotalPeriods() && rainDayCount < totalDays) {
            // Read the date for the current reporting period
            theDate = ldis2.readDouble();

            // Check if a new day has arrived
            if (Math.floor(theDate) > currentDay) {
                currentDay = Math.floor(theDate);

                // Day has measureable rainfall
                if (dailyRainfall > siteData.getRunoffThreshold()) {
                    rainDepths[rainDayCount] = dailyRainfall;
                    runoffDepths[rainDayCount] = dailyRunoff;
                    if (rainDayCount == 0) {
                        dryDays[rainDayCount] = 365;
                    } else {
                        dryDays[rainDayCount] = (int) (currentDay - previousDay) - 1;
                    }
                    rainIndex[rainDayCount] = rainDayCount;
                    previousDay = currentDay;
                    rainDayCount++;
                } // If no rainfall on this day then assign any runoff to previous wet day
                else if (dailyRunoff > 0) {
                    runoffDepths[rainDayCount] += dailyRunoff;
                }

                // Re-initialize daily rainfall & runoff
                dailyRainfall = 0.0;
                dailyRunoff = 0.0;
            }

            // Skip depth, head, volume & lateral inflow for outfall node
            //fs.Seek(4 * recdSize, SeekOrigin.Current);
            ldis2.skip(4 * Constants.RECD_SZ);

            // Read total inflow into outfall node
            runoff = ldis2.readFloat();    //A 4-byte floating point value

            // Skip overflow for outfall node and depth, head, volume, lateral inflow,
            // and total inflow to cistern node
            //fs.Seek(6 * recdSize, SeekOrigin.Current);
            ldis2.skip(6 * Constants.RECD_SZ);

            // Add on any overflow from rainwater harvesting cisterns node
            runoff += ldis2.readFloat();
            depth = runoff * cfsToIn;
            dailyRunoff += depth;
            totalRunoff += depth;
            //runoffModel.setTotalRunoff(runoffModel.getTotalRunoff() + depth);    //totalRunoff += depth;

            // Read rainfall for site
            ldis2.skip(1 * Constants.RECD_SZ);  //fs.Seek(1 * recdSize, SeekOrigin.Current);
            rainfall = ldis2.readFloat() * runoffModel.getRptStep() / 3600.0;
            dailyRainfall += rainfall;
            totalRainfall += rainfall;
            //runoffModel.setTotalRainfall(runoffModel.getTotalRainfall() + rainfall);  //totalRainfall += rainfall;

            // Move to start of next reporting period
            ldis2.skip(12 * Constants.RECD_SZ);//fs.Seek(12 * recdSize, SeekOrigin.Current);
            periods++;
        }

        //Copy local variables into model
/*
                double[] runoffDepths = new double[(int) totalDays];
        double[] rainDepths = new double[(int) totalDays];
        int[] dryDays = new int[(int) totalDays];
        int[] rainIndex = new int[(int) totalDays];
         */
        runoffModel.setRainDayCount(rainDayCount);
        runoffModel.setRunoffDepths(runoffDepths);
        runoffModel.setRainDepths(rainDepths);
        runoffModel.setDryDays(dryDays);
        runoffModel.setRainIndex(rainIndex);
        runoffModel.setTotalRainfall(totalRainfall);
        runoffModel.setTotalRunoff(totalRunoff);

        siteData.setRunoffModel(runoffModel);   //put model back into site data
    }

    private void computeSummaryStats(int mit, RunoffModel runoffModel, SiteData siteData) {

        Double years = runoffModel.getTotalDays() / 365.0;

        /*
            ANNUAL_RAINFALL = 0,
            ANNUAL_RUNOFF = 1,
            RAINFALL_DAYS = 2,
            RUNOFF_DAYS = 3,
            PCT_STORMS_CAP = 4,
            MIN_RUNOFF_DEPTH = 5,
            MAX_CAPTURE_DEPTH = 6,
            MAX_RETENTION = 7,
            COUNT = 8
         */
        runoffModel.getRunoffStats().add(runoffModel.getAnnualRainfall());    //runoffStats[(int)Statistics.ANNUAL_RAINFALL] = annualRainfall;
        runoffModel.getRunoffStats().add(runoffModel.getAnnualRunoff());  //runoffStats[(int)Statistics.ANNUAL_RUNOFF] = annualRunoff;
        runoffModel.getRunoffStats().add(runoffModel.getRainDayCount() / years); //runoffStats[(int)Statistics.RAINFALL_DAYS] = rainDayCount / years;
        runoffModel.getRunoffStats().add(runoffModel.getRunoffDayCount() / years);    //runoffStats[(int)Statistics.RUNOFF_DAYS] = runoffDayCount / years;

        computeCaptureStats(mit, runoffModel, siteData);

        runoffModel.getRunoffStats().add(runoffModel.getCaptureRatio() * 100);   //runoffStats[(int)Statistics.PCT_STORMS_CAP] = captureRatio * 100;
        runoffModel.getRunoffStats().add(runoffModel.getMinRunoffDepth());    //runoffStats[(int)Statistics.MIN_RUNOFF_DEPTH] = minRunoffDepth;
        runoffModel.getRunoffStats().add(runoffModel.getMaxCaptureDepth()); //runoffStats[(int)Statistics.MAX_CAPTURE_DEPTH] = maxCaptureDepth;
        runoffModel.getRunoffStats().add(runoffModel.getMaxRetention());  //runoffStats[(int)Statistics.MAX_RETENTION] = maxRetention;
    }

    private void computeCaptureStats(int mit, RunoffModel runoffModel, SiteData siteData) {

        if (runoffModel.getRainDayCount() == 0) {
            return;
        }

        // Initialize cumulative totals
        double rainfall = 0;
        double runoff = 0;
        double retention = 0;
        int captureCount = 0;
        int eventCount = 0;
        Boolean firstRunoff = false;

        // Check each wet day (previously sorted by rainfall amount)
        for (int i = 0; i < runoffModel.getRainDayCount(); i++) {
            // Skip back to back wet days 
            int k = runoffModel.getRainIndex()[i];
            if (runoffModel.getDryDays()[k] < mit) {
                continue;
            }
            eventCount++;

            // Add to total rainfall & runoff
            rainfall += runoffModel.getRainDepths()[k];

            // Check if runoff occurs
            if (runoffModel.getRunoffDepths()[k] > siteData.getRunoffThreshold()) {
                if (!firstRunoff) {
                    runoffModel.setMinRunoffDepth(runoffModel.getRainDepths()[k]);//minRunoffDepth = rainDepths[k];
                    firstRunoff = true;
                }
                runoff += runoffModel.getRunoffDepths()[k]; //runoffDepths[k];
            } // Otherwise update capture depth and days captured
            else {
                runoffModel.setMaxCaptureDepth(runoffModel.getRainDepths()[k]);//maxCaptureDepth = rainDepths[k];
                captureCount++;
            }

            // Update max. retention depth
            retention = runoffModel.getRainDepths()[k] - runoffModel.getRunoffDepths()[k];   //rainDepths[k] - runoffDepths[k];
            if (retention > runoffModel.getMaxRetention()) {   //maxRetention) {
                runoffModel.setMaxRetention(retention);//maxRetention = retention;
            }
        }

        // Compute capture coeff. (volume based) and capture ratio (event based)
        Double captureCoeff = new Double(0);

        captureCoeff = 1 - runoff / rainfall;
        captureCoeff = Math.max(0, captureCoeff);
        runoffModel.setCaptureCoeff(captureCoeff);
        if (eventCount == 0) {
            runoffModel.setCaptureRatio((double) 0);
        } else if (captureCoeff == 0.0) {
            runoffModel.setCaptureRatio((double) 0.0); //captureRatio = 0.0;
        } else {
            runoffModel.setCaptureRatio((double) captureCount / (double) eventCount);   //captureRatio = (double) captureCount / (double) eventCount;
        }

        int runoffCount = eventCount - captureCount;

        String eventCountStr = runoffCount + " runoff events out of "
                + eventCount + " total.";
        runoffModel.setEventCountStr(eventCountStr);
    }

    private void createRainRunoffPlot(int mit, RunoffModel runoffModel, SiteData siteData) {
        {
            for (int i = 0; i < runoffModel.getRainDayCount(); i++) {
                if (runoffModel.getDryDays()[i] < mit) {
                    continue;
                }
                XYPairModel xyPairModel;
                if (runoffModel.getRunoffDepths()[i] <= siteData.getRunoffThreshold()) {
                    xyPairModel = new XYPairModel(runoffModel.getRainDepths()[i].doubleValue(), (double) 0);
                    //rainRunoffList.Add(new PointPair(rainDepths[i], 0));
                } else {
                    xyPairModel = new XYPairModel(runoffModel.getRainDepths()[i].doubleValue(), runoffModel.getRunoffDepths()[i].doubleValue());
                    //rainRunoffList.Add(new PointPair(rainDepths[i], runoffDepths[i]));
                }
                runoffModel.getRainRunoffList().add(xyPairModel);
            }

        }
    }

    private void createRainIntervalPlot(int mit, RunoffModel runoffModel, SiteData siteData) {

        //local vars for easy use
        int rainDayCount = runoffModel.getRainDayCount();

        // Create temporary array to hold rainfall
        // double[] sortedRain = new double[rainDayCount];
        Map<Integer, Double> unsortMap = new HashMap<Integer, Double>();
        for (int i = 0; i < rainDayCount; i++) {
            //sortedRain[i] = runoffModel.getRainDepths()[i];    //rainDepths[i];
            //Create map key=index, value
            unsortMap.put(i, runoffModel.getRainDepths()[i]);
        }

        //Copy to list
        List<Entry<Integer, Double>> list = new LinkedList<Entry<Integer, Double>>(unsortMap.entrySet());

        // Sort the list based on values
        Collections.sort(list, new Comparator<Entry<Integer, Double>>() {
            public int compare(Entry<Integer, Double> o1,
                    Entry<Integer, Double> o2) {
                return o1.getValue().compareTo(o2.getValue());
            }
        });

        //Copy keys to rainIndex
        int x = 0;
        Integer[] rainIndex = runoffModel.getRainIndex();
        //Copy key values to rainIndex
        for (Map.Entry<Integer, Double> item : list) {
            //for (int x = 0; x < rainIndex.length; x++) {
            if (x < rainDayCount) {
                rainIndex[x] = item.getKey();
            } else {
                rainIndex[x] = 0;
            }
            x += 1;
            //}
        }

        //Copy values into runOffModel
        runoffModel.setRainIndex(rainIndex);

        // Create a temporary array to hold runoff fractions 
        int pcntCount = runoffModel.RUNOFF_PCNT_LABELS.length;    //PcntLabels.Length;
        double[] runoffPcnt = new double[pcntCount];
        double totalRunoff = 0.0;

        // Compute runoff for each rainfall percentile interval
        int index1 = 0;
        int index2 = 0;
        double rainPcnt = 0;
        for (int i = 0; i < pcntCount; i++) {
            index2 = (int) Math.round(runoffModel.RUNOFF_PCNT_VALUES[i] / 100 * rainDayCount);  //PcntValues[i] / 100 * rainDayCount);
            if (index2 >= rainDayCount) {
                index2 = rainDayCount - 1;
            }
            double rainSum = 0.0;
            double runoffSum = 0.0;
            for (int j = index1; j < index2; j++) {
                int k = runoffModel.getRainIndex()[j]; //rainIndex[j];
                rainPcnt = runoffModel.getRainDepths()[k]; //rainDepths[k];
                if (runoffModel.getDryDays()[k] < mit) {
                    continue;    //dryDays[k] < mit) continue;
                }
                rainSum += runoffModel.getRainDepths()[k];  //rainDepths[k];
                if (runoffModel.getRunoffDepths()[k].compareTo(siteData.getRunoffThreshold()) > 0) //(runoffDepths[k] > runoffThreshold)
                {
                    runoffSum += runoffModel.getRunoffDepths()[k];
                    totalRunoff += runoffModel.getRunoffDepths()[k];
                }
            }
            runoffModel.runoffDepthLabels[i] = new DecimalFormat("#0.00").format(rainPcnt);  //rainPcnt.toString("F2");            
            runoffPcnt[i] = runoffSum;
            index1 = index2;
        }
        if (totalRunoff > 0) {
            for (int i = 0; i < pcntCount; i++) {
                runoffPcnt[i] *= 100 / totalRunoff;
                //Add as we go along
                runoffModel.getRunoffPcntList().add(new XYPairModel(null, runoffPcnt[i]));
            }
        }

        //This is done above in for loop
        // Add runoff fractions to list used for plotting
        //runoffPcntList.Add(null, runoffPcnt);
    }

    private void createRetentionPcntPlot(int mit, RunoffModel runoffModel, SiteData siteData) {
        {
            int totalEvents = 0;
            double retained;
            int pcntCount = runoffModel.RUNOFF_PCNT_LABELS.length; //PcntLabels.Length;
            double[] depths = new double[pcntCount];
            int[] events = new int[pcntCount];
            for (int i = 0; i < pcntCount; i++) {
                depths[i] = Double.parseDouble(runoffModel.runoffDepthLabels[i]);
                events[i] = 0;
            }

            for (int j = 0; j < runoffModel.getRainDayCount(); j++) {
                if (runoffModel.getDryDays()[j] < mit) {
                    continue;
                }
                totalEvents++;
                if (runoffModel.getRunoffDepths()[j] <= siteData.getRunoffThreshold()) {
                    for (int i = 0; i < pcntCount; i++) {
                        events[i]++;
                    }
                } else {
                    double rainfall = runoffModel.getRainDepths()[j];
                    retained = rainfall - runoffModel.getRunoffDepths()[j];
                    retained = Math.max(retained, 0);
                    for (int i = 0; i < pcntCount; i++) {
                        if (rainfall >= depths[i] && retained >= depths[i]) {
                            events[i]++;
                        }
                    }
                }
            }

            double r = (double) totalEvents / 100;
            for (int i = 0; i < pcntCount; i++) {
                double pcnt = 0;
                if (totalEvents > 0) {
                    pcnt = (double) events[i] / r;
                }
                //retentionPcntList.Add(depths[i], pcnt);
                runoffModel.getRetentionPcntList().add(new XYPairModel(depths[i], pcnt));
            }
        }

    }

    private Integer createRunoffFreqPlot(int mit, RunoffModel runoffModel, SiteData siteData) {
        {
            // Case of no rainfall
            if (runoffModel.getRainDayCount() == 0) {
                return 0;
            }

            // Create temporary array to hold rainfall & runoff depths
            double[] sortedRain = new double[runoffModel.getRainDayCount()];
            double[] sortedRunoff = new double[runoffModel.getRainDayCount()];

            // Place measureable rainfall / runoff days into temp array
            int rainDays = 0;
            int runoffDays = 0;
            for (int i = 0; i < runoffModel.getRainDayCount(); i++) {
                if (runoffModel.getRainDepths()[i] > siteData.getRunoffThreshold()) {
                    sortedRain[rainDays] = runoffModel.getRainDepths()[i];
                    rainDays++;
                }
                if (runoffModel.getDryDays()[i] < mit) {
                    continue;
                }
                if (runoffModel.getRunoffDepths()[i] > siteData.getRunoffThreshold()) {
                    sortedRunoff[runoffDays] = runoffModel.getRunoffDepths()[i];
                    runoffDays++;
                }
            }

            //Sort temporary array
            if (rainDays == 0 && runoffDays == 0) {
                return 0;
            }
            if (runoffDays > 0) {
                Arrays.sort(sortedRunoff, 0, runoffDays);  //, 0, runoffDays);
            }
            if (rainDays > 0) {
                Arrays.sort(sortedRain, 0, rainDays);  //, 0, rainDays);
            }
            // Find total years simulated
            double years = runoffModel.getTotalDays() / 365.0;

            //For each day with measureable rainfall
            int tenths = (int) (sortedRain[0] * 10.0);
            for (int j = 0; j < rainDays; j++) {
                // Only plot at intervals of 0.2 inches
                if ((int) (sortedRain[j] * 10.0) < tenths) {
                    continue;
                }

                // Convert frequency to days per year
                double f = (rainDays - j) / years;

                // Add runoff and days/year to frequency plot 
                //rainFreqList.Add(new PointPair(sortedRain[j], f));
                runoffModel.getRainFreqList().add(new XYPairModel(sortedRain[j], f));
                tenths += 2;
            }

            // For each day with measureable runoff
            tenths = (int) (sortedRunoff[0] * 10.0);
            for (int j = 0; j < runoffDays; j++) {
                // Only plot at intervals of 0.2 inches
                if ((int) (sortedRunoff[j] * 10.0) < tenths) {
                    continue;
                }

                // Convert frequency to days per year
                double f = (runoffDays - j) / years;

                // Add runoff and days/year to frequency plot 
                //runoffFreqList.Add(new PointPair(sortedRunoff[j], f));
                runoffModel.getRunoffFreqList().add(new XYPairModel(sortedRunoff[j], f));
                tenths += 2;
            }
            return runoffDays;
        }
    }

    @Override
    public XEventModel getPeakValues(String outFile, SiteData siteData) throws SWCException , IOException {

        XEventModel output = new XEventModel();

        long periods = 0;
        double rain, roff;
        double rainfall = 0;
        double runoff = 0;

        File f = new File(outFile);
        FileInputStream fis = null;
        FileInputStream fis2 = null;
        LittleEndianDataInputStream ldis = null;
        LittleEndianDataInputStream ldis2 = null;
        RunoffModel runoffModel = siteData.getRunoffModel();

        try {

            //Create 2 instances b/c LittleEndianDataInputStream didn't seem as it could be read twice
            fis = new FileInputStream(f);
            fis2 = new FileInputStream(f);
            ldis = new LittleEndianDataInputStream(fis);
            ldis2 = new LittleEndianDataInputStream(fis2);

            // Check that the file is complete
            if (outFileComplete(f, ldis, siteData)) {
                // Move file pointer 1 record before start of output results
                //fs.Seek(offset - recdSize, SeekOrigin.Begin);
                ldis2.skip(runoffModel.getOffset() - Constants.RECD_SZ);

                // Read reporting step
                //rptStep = reader.ReadInt32();
                runoffModel.setRptStep((long) ldis2.readInt());
                
                //Local vars for ease of use, but will be copied to model at end
                Integer rainDayCount = runoffModel.getRainDayCount();
                long totalDays = runoffModel.getTotalDays();

                // Read output for each reporting period
                //while (periods < totalPeriods && rainDayCount < totalDays) {
                while (periods < runoffModel.getTotalPeriods() && rainDayCount < totalDays) {
                    // Skip date, depth, head, volume & lateral inflow for outfall node
                    ldis2.skip(6 * Constants.RECD_SZ);   //fs.Seek(6 * recdSize, SeekOrigin.Current);

                    // Read total inflow into outfall node
                    roff = ldis2.readFloat();    //roff = reader.ReadSingle();                    

                    // Skip overflow for outfall node and depth, head, volume, lateral inflow,
                    // and total inflow to cistern node
                    ldis2.skip(6 * Constants.RECD_SZ);   //fs.Seek(6 * recdSize, SeekOrigin.Current);

                    // Add on any overflow from rainwater harvesting cisterns node
                    //roff += reader.ReadSingle();
                    roff += ldis2.readFloat();
                    if (roff > runoff) {
                        runoff = roff;
                    }

                    // Read rainfall for site
                    ldis2.skip(1 * Constants.RECD_SZ);     //fs.Seek(1 * recdSize, SeekOrigin.Current);
                    rain = ldis2.readFloat();    //reader.ReadSingle();
                    if (rain > rainfall) {
                        rainfall = rain;
                    }

                    // Move to start of next reporting period
                     ldis2.skip(12 * Constants.RECD_SZ);     //fs.Seek(12 * recdSize, SeekOrigin.Current);
                    periods++;
                }

                // Convert cfs to in/hr
                runoff *= 3600.0 * 12.0 /  Constants.SITE_DATA_AREA /  43560.0; //SiteData.area / 43560.0;
            }
            
            //Copy results to model for output
            output.setPeakRunoffOne(runoff);
            output.setPeakRainfallOne(rainfall);

        } catch (Exception ex) {
            // if any error occurs
            ex.printStackTrace();
            logger.error("runoffService.getPeakValues:" + ex.getMessage());
            throw new SWCException("Error running runoff peak stats: " + ex.getMessage());
        } finally {            
            fis.close();
            fis2.close();
            ldis.close();
            ldis2.close();
        }
        
        //Copy results into model
        //output.setRainfall(rainfall);
        
        return output;
        
    }

}
