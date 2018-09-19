/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.dll;

import com.sun.jna.Library;

/**
 *
 * @author UYEN.TRAN
 */
public interface Swmm5Dll extends Library {

    //Swmm5Dll INSTANCE = (Swmm5Dll) Native.loadLibrary("swmm5", Swmm5Dll.class);

    public int swmm_run(String f1, String f2, String f3);   //method name (swmm_run) must match what is in the dll

}
