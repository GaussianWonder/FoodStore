package com.gaussianwonder.foodpanda.email;

import com.gaussianwonder.foodpanda.config.Env;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class Email {
    private final String subject;
    private final String body;

    public Email(String subject) {
        this.subject = subject;
        this.body = "";
    }

    public Email(String subject, String body) {
        this.subject = subject;
        this.body = body;
    }

    private Properties getEmailProperties() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.mailtrap.io");
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.ssl.trust", "smtp.mailtrap.io");
        return props;
    }

    private Session getSession() {
        return Session.getInstance(getEmailProperties(), new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Env.get("EMAIL_USER"), Env.get("EMAIL_PASSWORD"));
            }
        });
    }

    public void send() throws MessagingException {
        Message message = new MimeMessage(getSession());
        message.setFrom(new InternetAddress(Env.get("EMAIL_SENDER")));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(""));
        message.setSubject(subject);

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(body, "text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
    }
}
