package gov.epa.stormwater.service.email;

import org.springframework.core.io.InputStreamSource;

public interface EmailNotificationService {
    
	 public void sendMail(String to, String subject, String body) throws NotificationException;	 
         
         public void sendMailAttachment(String to, String subject, String body, String fileName, InputStreamSource attach) throws NotificationException;	 
         
}
