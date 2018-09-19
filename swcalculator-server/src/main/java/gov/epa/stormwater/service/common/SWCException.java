/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service.common;

/**
 *
 * @author UYEN.TRAN
 */
public class SWCException extends Exception {

    public SWCException() {

    }
    	public SWCException(String message) {
		super(message);
	}

	public SWCException(String message, Throwable cause) {
		super(message, cause);
	}

	public SWCException(Throwable cause) {
		super(cause);
	}
        
}
