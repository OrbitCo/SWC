/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.enums;

/**
 *
 * @author UYEN.TRAN
 */
public enum Statistics {
    // Summary Statistics

    ANNUAL_RAINFALL(0),
    ANNUAL_RUNOFF(1),
    RAINFALL_DAYS(2),
    RUNOFF_DAYS(3),
    PCT_STORMS_CAP(4),
    MIN_RUNOFF_DEPTH(5),
    MAX_CAPTURE_DEPTH(6),
    MAX_RETENTION(7),
    COUNT(8);

    private Integer value;

    private Statistics(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return this.value;
    }
}
