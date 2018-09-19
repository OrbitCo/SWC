/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model;

/**
 *
 * @author UYEN.TRAN
 */
public enum LandCovers {
    FOREST(0),
    MEADOW(1),
    LAWN(2),
    DESERT(3),
    FILL(4),   //not currently used
    IMPERV(5),
    COUNT(6);
    
    private int value;

    private LandCovers(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
