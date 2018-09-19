/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service.utils;

import gov.epa.stormwater.service.CalculateServiceImpl;
import gov.epa.stormwater.service.ClimateServiceImpl;
import gov.epa.stormwater.service.common.Constants;
import gov.epa.stormwater.service.common.SWCException;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author UYEN.TRAN
 */
public class Utils {

    private static Logger logger = LoggerFactory
            .getLogger(Utils.class);

    /* This reads a file from the project's classpath (resources) folder.  Only need to pass in name of file */
    public static String readFile(String file) throws SWCException {

        String output;
        InputStream inputStream = null;

        try {
            inputStream = Utils.class.getResourceAsStream("/" + file);
            if (inputStream != null) {
                output = IOUtils.toString(inputStream, "UTF-8");
                inputStream.close();
            } else {
                throw new SWCException("File not found: " + file);
            }

        } catch (FileNotFoundException e) {
            logger.error("Utils.readFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        } catch (IOException i) {
            logger.error("Utils.readFile: " + i.getMessage());
            throw new SWCException(i.getMessage());
        }

        return output;
    }

    //Returns String contents of file.  Pass in entire filepath 
    public static String readSWCFile(String filePath) throws SWCException {

        String output;

        try {

            //File f = new File(Constants.FILE_PATH);
            //InputStream inputStream = new FileInputStream(f + File.separator + file);
            InputStream inputStream = new FileInputStream(new File(filePath));
            output = IOUtils.toString(inputStream, "UTF-8");
            inputStream.close();
        } catch (FileNotFoundException e) {
            logger.error("Utils.readExternalFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        } catch (IOException ie) {
            logger.error("Utils.readExternalFile: " + ie.getMessage());
            throw new SWCException(ie.getMessage());
        }

        return output;
    }

    //Pass
    public static File getSWCFile(String filePath) throws SWCException {

        File f = new File(filePath);
        return f;

    }

    public static File createSWCFile(String file) throws SWCException {

        String output = "";
        //String filePath;

        try {
            //Check dir exists.  Create if missing
            File fp = new File(Constants.FILE_PATH);
            if (!fp.exists()) {
                boolean b = fp.mkdirs();
                if (!b) {
                    String e = "Failed to create directory for report output. DIR: "
                            + Constants.FILE_PATH;
                    logger.error(e);
                    throw new SWCException(e);
                }
            }
            //create new file.  overwrite any existing file
            //new FileOutputStream(f + File.separator + file, false).close();
            File newfile = new File(file);
            newfile.createNewFile();
            return newfile;
        } catch (FileNotFoundException e) {
            logger.error("Utils.createFile: " + e.getMessage());
            throw new SWCException(e.getMessage());
        } catch (IOException i) {
            logger.error("Utils.createFile: " + i.getMessage());
            throw new SWCException(i.getMessage());
        }

    }

    public static void writeLine(BufferedWriter bw, String line) throws SWCException {

        try {
            bw.write(line);
            bw.newLine();
        } catch (IOException e) {
            logger.error("Utils.writeLine: " + e.getMessage());
            throw new SWCException(e.getMessage());
        }
    }

    public static void copyFileUsingFileStreams(File source, File dest)
            throws SWCException {
        InputStream input = null;
        OutputStream output = null;
        try {
            input = new FileInputStream(source);
            output = new FileOutputStream(dest);
            byte[] buf = new byte[1024];
            int bytesRead;
            while ((bytesRead = input.read(buf)) > 0) {
                output.write(buf, 0, bytesRead);
            }
            input.close();
            output.close();
        } catch (IOException e) {
            logger.error("Utils.copyFileUsingFileStreams: " + e.getMessage());
            throw new SWCException(e.getMessage());
        }
    }

    public static byte[] toByteArray(Object obj) throws IOException {
        byte[] bytes = null;
        ByteArrayOutputStream bos = null;
        ObjectOutputStream oos = null;
        try {
            bos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(bos);
            oos.writeObject(obj);
            oos.flush();
            bytes = bos.toByteArray();
        } finally {
            if (oos != null) {
                oos.close();
            }
            if (bos != null) {
                bos.close();
            }
        }
        return bytes;
    }

}
