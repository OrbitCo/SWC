/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import gov.epa.stormwater.model.LidModel;
import gov.epa.stormwater.model.SiteData;
import gov.epa.stormwater.service.common.SWCException;
import gov.epa.stormwater.service.utils.Utils;
import java.io.BufferedWriter;
import java.text.DecimalFormat;
import org.springframework.stereotype.Service;

/**
 *
 * @author UYEN.TRAN
 */
@Service("lidDataService")
public class LidDataServiceImpl implements LidDataService {

    // Writes generic LID descriptions to a SWMM input file
    // (LIDs not listed here, like Impervious Disconnection, are
    // not modeled using SWMM's LID extensions.)
    @Override
    public void writeLidControls(BufferedWriter bw, SiteData siteData)
            throws SWCException {

        Utils.writeLine(bw, "[LID_CONTROLS]");
        String line;
        double porosity;
        double vRatio;
        
        LidModel lidModel = siteData.getLidModel();
        System.out.println("Soil Height " + lidModel.getGrSoilHeight());

        // Rain Garden
        Utils.writeLine(bw, "RainGarden  BC");
        line = "RainGarden  SURFACE  " + lidModel.getRgRimHeight()
                + "  0  0  0  0";
        Utils.writeLine(bw, line);

        porosity = Double.parseDouble(lidModel.getRgSoilPorosity().toString()) / 100;
        line = "RainGarden  SOIL  " + lidModel.getRgSoilHeight().toString() + "  "
                //F3 denotes format with 3 fixed after decimal + porosity.toString("F3") + "  0.1  0.05  "
                + new DecimalFormat("#0.000").format(porosity) + "  0.1  0.05  "
                + lidModel.getRgSoilKsat().toString() + "  10  1.6";
        Utils.writeLine(bw, line);
        line = "RainGarden  STORAGE  0  0  "
                //F4 denotes format -1234.56 ("F4", en-US) -> -1234.5600 + siteData.soilKsat.toString("F4") + "  0";
                + new DecimalFormat("#0.0000").format(siteData.getSoilKsat()) + "  0";
                
        Utils.writeLine(bw, line);
        Utils.writeLine(bw, " ");

        // Green Roof
        Utils.writeLine(bw, "GreenRoof  BC");
        line = "GreenRoof  SURFACE  0  0  0  0  0";
        Utils.writeLine(bw, line);
        porosity = Double.parseDouble(lidModel.getGrSoilPorosity().toString()) / 100;
        line = "GreenRoof  SOIL  " + lidModel.getGrSoilHeight().toString() + "  "
                // + porosity.toString("F3") + "  0.1  0.05  "
                + new DecimalFormat("#0.000").format(porosity) + "  0.1  0.05  "
                + lidModel.getGrSoilKsat().toString() + "  10  1.6";
        Utils.writeLine(bw, line);
        line = "GreenRoof  STORAGE  3  0.75  0  0";
        Utils.writeLine(bw, line);
        line = "GreenRoof  DRAIN  " + lidModel.getGrSoilKsat().toString() + "  0.5  0  0";
        Utils.writeLine(bw, line);
        Utils.writeLine(bw, " ");

        // Street Planter
        Utils.writeLine(bw, "StreetPlanter  BC");
        line = "StreetPlanter  SURFACE  " + lidModel.getSpRimHeight().toString()
                + "  0  0  0  0";
        Utils.writeLine(bw, line);
        porosity = Double.parseDouble(lidModel.getSpSoilPorosity().toString()) / 100;
        line = "StreetPlanter  SOIL  " + lidModel.getSpSoilHeight().toString() + "  "
                //+ porosity.toString("F3") + "  0.1  0.05  "
                + new DecimalFormat("#0.000").format(porosity) + "  0.1  0.05  "
                + lidModel.getSpSoilKsat().toString() + "  10  1.6";
        Utils.writeLine(bw, line);
        vRatio = Double.parseDouble(lidModel.getSpDrainVoid().toString()) / 100;
        line = "StreetPlanter  STORAGE  " + lidModel.getSpDrainHeight().toString()
                //+ "  " + vRatio.toString("F3") + "  "
                + " " + new DecimalFormat("#0.000").format(vRatio) + "  "
                //+ SiteData.soilKsat.toString("F4") + "  0";
                + new DecimalFormat("#0.0000").format(siteData.getSoilKsat()) + "  0";
        Utils.writeLine(bw, line);
        Utils.writeLine(bw, " ");

        // Porous Pavement
        Utils.writeLine(bw, "PorousPavement  PP");
        Utils.writeLine(bw, "PorousPavement  SURFACE  0.05  0  0.01  3  0");
        vRatio = Double.parseDouble(lidModel.getPpPaveVoid().toString()) / 100;
        line = "PorousPavement  PAVEMENT  " + lidModel.getPpPaveHeight().toString()
                //+ "  " + vRatio.toString("F3") + "  0  400  0";
                + " " + new DecimalFormat("#0.000").format(vRatio) + "  0  400  0";
        Utils.writeLine(bw, line);
        vRatio = Double.parseDouble(lidModel.getPpDrainVoid().toString()) / 100;
        line = "PorousPavement  STORAGE  " + lidModel.getPpDrainHeight().toString()
                //+ "  " + vRatio.toString("F3") + "  "
                + "  " + new DecimalFormat("#0.000").format(vRatio) + "  "
                //+ SiteData.soilKsat.toString("F4") + "  0";
                + new DecimalFormat("#0.0000").format(siteData.getSoilKsat()) + "  0";
        Utils.writeLine(bw, line);
        Utils.writeLine(bw, " ");
    }

    @Override
    // Writes LID usage data to a SWMM input file.
    // (LIDs not listed here, like Impervious Disconnection, are
    // not modeled using SWMM's LID extensions.)
    public void writeLidUsage(BufferedWriter bw, SiteData siteData)
            throws SWCException {

        double area = 0;
        double width = 0;
        double fromImperv = 0;
        double capturedPct = 0;
        
        String line;
        
        LidModel lidModel = siteData.getLidModel();

        Utils.writeLine(bw, "[LID_USAGE]");

        // Porous Pavement
        if (siteData.getPpArea() > 0) {
            area = siteData.getPpArea() * 43560;
            width = area / siteData.getPathLength();
            if (siteData.getImpervArea1() > 0) {
                capturedPct = (100 - Double.parseDouble(lidModel.getPpCapture().toString())) / Double.parseDouble(lidModel.getPpCapture().toString()) * 100;
                fromImperv = siteData.getPpArea() / siteData.getImpervArea1() * capturedPct;
                fromImperv = Math.min(100, fromImperv);
            } else {
                fromImperv = 0.0;
            }
            line = "Subcatch1  PorousPavement  1  " + new DecimalFormat("#0.00").format(area) + "  "    //area.toString("F2") + "  "
                    //+ width.toString("F2") + "  0  " + fromImperv.toString("F2") + "  0";
                    + new DecimalFormat("#0.00").format(width) + "  0  " + new DecimalFormat("#0.00").format(fromImperv) + "  0";
            Utils.writeLine(bw, line);
        }

        // Rain Garden
        if (siteData.getRgArea() > 0) {
            area = siteData.getRgArea() * 43560;
            width = 0;
            if (siteData.getImpervArea1() > 0) {
                fromImperv = siteData.getFracRainGarden() * 100.0;
            } else {
                fromImperv = 0.0;
            }
            line = "Subcatch1  RainGarden  1  " + new DecimalFormat("#0.00").format(area) // area.toString("F2")
                    + "  0  0  " + new DecimalFormat("#0.00").format(fromImperv) + "  0";
            Utils.writeLine(bw, line);
        }

        // Green Roof
        if (siteData.getGrArea() > 0) {
            area = siteData.getGrArea() * 43560;
            width = 0;
            line = "Subcatch1  GreenRoof  1  " + new DecimalFormat("#0.00").format(area) //area.toString("F2")
                    + "  0  0  0  0";
            Utils.writeLine(bw, line);
        }

        // Street Planter
        if (siteData.getSpArea() > 0) {
            area = siteData.getSpArea() * 43560;
            width = 0;
            if (siteData.getImpervArea1() > 0) {
                capturedPct = (100 - Double.parseDouble(lidModel.getSpCapture().toString())) / Double.parseDouble(lidModel.getSpCapture().toString()) * 100;
                fromImperv = siteData.getSpArea() / siteData.getImpervArea1() * capturedPct;
                fromImperv = Math.min(100, fromImperv);
            } else {
                fromImperv = 0.0;
            }
            line = "Subcatch1  StreetPlanter  1  " + new DecimalFormat("#0.00").format(area) //area.toString("F2")
                    + "  0  0  " + new DecimalFormat("#0.00").format(fromImperv) + "  0";
            Utils.writeLine(bw, line);
        }
        Utils.writeLine(bw, " ");
    }

}
