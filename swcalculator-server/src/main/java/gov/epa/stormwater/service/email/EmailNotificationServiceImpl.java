package gov.epa.stormwater.service.email;


import java.io.File;

import javax.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service("emailNotificationService")
public class EmailNotificationServiceImpl implements EmailNotificationService {

        private static Logger logger = LoggerFactory
            .getLogger(EmailNotificationServiceImpl.class);
        
    @Autowired
    private MailSender mailSender;

    @Autowired
    private SimpleMailMessage message;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    private static String from = "info-swc@epa.gov";
        
    /**
     * Utility method to send simple email
     *
     * @throws NotificationException 
     *
     */
    public void sendMail(String to, String subject, String body) throws NotificationException {
        try {
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            logger.debug("Attempted Email send to:" + to);
        } catch (Exception exception) {
            throw new NotificationException(exception);
        }
    }
      /**
     * Utility method to send email w/attachment
     *
     * @throws NotificationException 
     *
     */
    
    public void sendMailAttachment(String to, String subject, String body, String fileName, InputStreamSource attach) throws NotificationException {
               
        
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        
        try {            
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setFrom(from);
            helper.setSubject(subject);            
            helper.setText(body);
            
            helper.addAttachment(fileName, attach);            
            
            javaMailSender.send(mimeMessage);
            logger.debug("Attempted Email send to:" + to);
        } catch (Exception exception) {
            logger.error("EmailNotificatinService: " + exception);
            throw new NotificationException(exception);
        }
    }    

}
