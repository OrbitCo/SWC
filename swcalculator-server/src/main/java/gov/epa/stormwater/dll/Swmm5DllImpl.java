/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.dll;

import com.sun.jna.Native;
import gov.epa.stormwater.service.CalculateServiceImpl;
import gov.epa.stormwater.service.ClimateServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.logging.Level;

/**
 * @author UYEN.TRAN
 */
public class Swmm5DllImpl implements Swmm5Dll {
    private volatile static Swmm5DllImpl uniqueInstance;
    private static Logger logger = LoggerFactory.getLogger(Swmm5DllImpl.class);
    private static Swmm5Dll swmm5;

    static {
        System.loadLibrary("swmm5"); //need to load the library in order for JNA to find it in Swmm5DllRun.java
        //Calculations wrong with 64 bit version System.loadLibrary("swmm5_x64");
    }

    private Swmm5DllImpl() {
    }

    public static Swmm5DllImpl getInstance() {
        if (uniqueInstance == null) {
            synchronized (Swmm5DllImpl.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new Swmm5DllImpl();
                    //System.loadLibrary("swmm5"); //need to load the library in order for JNA to find it in Swmm5DllRun.java
                    swmm5 = (Swmm5Dll) Native.loadLibrary("swmm5", Swmm5Dll.class);  //JNA
                    ////Calculations wrong with 64 bit version  Swmm5Dll swmm5 = (Swmm5Dll) Native.loadLibrary("swmm5_x64", Swmm5Dll.class);  //JNA
                }
            }
        }
        return uniqueInstance;
    }


    @Override
    synchronized public int swmm_run(String f1, String f2, String f3) {
        int result = -999;
        // -- original

//        //System.loadLibrary("swmm5"); //need to load the library in order for JNA to find it in Swmm5DllRun.java
//        Swmm5Dll swmm5 = (Swmm5Dll) Native.loadLibrary("swmm5", Swmm5Dll.class);  //JNA
//        ////Calculations wrong with 64 bit version  Swmm5Dll swmm5 = (Swmm5Dll) Native.loadLibrary("swmm5_x64", Swmm5Dll.class);  //JNA

//        // -- sinleton
        result = swmm5.swmm_run(f1, f2, f3);
        logger.debug("Swmm5DllImpl.swmm_run:" + f3);



        System.out.println("Swmm5DllImpl.swmm_run");
        System.out.println(" ################# result = "+result);
        return result;


        // -- process builder
//
//        int exitValue = -999;
//
//        int count = 0;
//
//        logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - starting ");
//
//        if (!isFileExist(f1))
//            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - file inFile not exist: " + f1);
//
//        if (!isFileExist(f2))
//            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - file rptFile not exist: " + f1);
//
//
//        if (!isFileExist(f1) || !isFileExist(f2))
//            logger.debug("####### !!!!! " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run -   input files not exist" + f1);
//
//
//        while (count < 4) {
//            exitValue = runExe(f1, f2, f3);
//            count++;
//
//            logger.debug("####### " + Thread.currentThread().getId() + " - processing is finished, count =  " + count + " check the output file: " + f3);
//            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - file outFile: " + f1 + " exist: " + isFileExist(f3));
//
//            if (isFileExist(f3))
//                break;
//        }
//
//        return exitValue;

    }


//    private synchronized int runExe(String f1, String f2, String f3) {
//        int exitValue = -999;
//        try {
//            // original path
////            ProcessBuilder probuilder = new ProcessBuilder(new String[]{"D:\\Public\\Servers\\Apps\\EPASWM~1.1\\swmm5.exe", inFile, rptFile, outFile});
////            probuilder.directory(new File("D:\\Public\\Servers\\Apps\\EPASWM~1.1\\"));
//
//
//            // my path
//            // C:\\swcalculator_home\\EPA_SWMM_5.1
//            ProcessBuilder probuilder = new ProcessBuilder(new String[]{"C:/swcalculator_home/EPA_SWMM_5.1/swmm5.exe", f1, f2, f3});
//            probuilder.directory(new File("C:/swcalculator_home/EPA_SWMM_5.1/"));
//
//            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.runExe - starting ");
//
//            Process process = probuilder.start();
//            InputStream is = process.getInputStream();
//            InputStreamReader isr = new InputStreamReader(is);
//            BufferedReader br = new BufferedReader(isr);
//
//            while (true) {
//                if (br.readLine() == null) {
//                    try {
//                        exitValue = process.waitFor();
//                        logger.debug("SWMM5.exe Exit Value is " + exitValue);
//                    } catch (InterruptedException var12) {
//                        System.out.println("var12 = " + var12);
//                        var12.printStackTrace();
//                    }
//                    break;
//                }
//            }
//        } catch (IOException var13) {
//            java.util.logging.Logger.getLogger(CalculateServiceImpl.class.getName()).log(Level.SEVERE, (String) null, var13);
//        }
//
//        logger.debug("runSwmm results: " + exitValue);
//
//        return exitValue;
//
//    }


    private synchronized int runDll(String f1, String f2, String f3) {
        int result = -999;

//        // -- sinleton


        logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.runDll - starting ");

        if (!isFileExist(f1))
            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - file inFile not exist: " + f1);

        if (!isFileExist(f2))
            logger.debug("####### " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run - file rptFile not exist: " + f1);


        if (!isFileExist(f1) || !isFileExist(f2))
            logger.debug("####### !!!!! " + Thread.currentThread().getId() + " - Swmm5DllImpl.swmm_run -   input files not exist" + f1);


        result = swmm5.swmm_run(f1, f2, f3);

        logger.debug("####### " + Thread.currentThread().getId() + " - processing is finished, checking the output file: " + f3);
        logger.debug("Swmm5DllImpl.runDll:" + f3);


        System.out.println("Swmm5DllImpl.swmm_run");
//        System.out.println(" ################# result = " + result);
        return result;
    }


    private boolean isFileExist(String fileName) {
        File file = new File(fileName);
        if (file != null && file.exists() && file.isFile())
            return true;

        return false;
    }

}
