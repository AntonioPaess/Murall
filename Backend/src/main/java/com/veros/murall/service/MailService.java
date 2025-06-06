package com.veros.murall.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${GMAIL_APP_EMAIL}")
    private String senderEmail;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendAccountVerificationEmail(String recipientEmail, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            System.out.println("Attempting to send HTML email to: " + recipientEmail);
            mailSender.send(message);
            System.out.println("E-mail successfully sent to: " + recipientEmail);
        } catch (MessagingException e) {
            System.err.println("ERROR SENDING EMAIL: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendPasswordResetEmail(String recipientEmail, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            System.out.println("Attempting to send password reset email to: " + recipientEmail);
            mailSender.send(message);
            System.out.println("Password reset email sent to: " + recipientEmail);
        } catch (MessagingException e) {
            System.err.println("ERROR SENDING PASSWORD RESET EMAIL: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
