package gov.epa.stormwater.service.email;

public class NotificationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1202498223868562462L;

	public NotificationException() {

	}

	public NotificationException(String message) {
		super(message);
	}

	public NotificationException(String message, Throwable cause) {
		super(message, cause);
	}

	public NotificationException(Throwable cause) {
		super(cause);
	}

	protected NotificationException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
}
