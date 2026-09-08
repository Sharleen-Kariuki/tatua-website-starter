package com.email;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.Authenticator;
import jakarta.mail.internet.MimeMessage;

public class TrialExpiration {
	private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
	private static final String EMAIL_FROM = dotenv.get("EMAIL_FROM");
	private static final String EMAIL_TO = dotenv.get("EMAIL_TO");
	private static final String APP_PASSWORD = dotenv.get("APP_PASSWORD");
	
	public static void main(String[] args) throws Exception {
		// Command to locate the path of the template
		Path templatePath = Path.of("../pages/trial_expiration_email.html");
		

		// Stores the results of the html text into a variable 
		String htmlContent = Files.readString(templatePath, StandardCharsets.UTF_8);

		Message message = new MimeMessage(getEmailSession());
		message.setFrom(new InternetAddress(EMAIL_FROM));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(EMAIL_TO));
		message.setSubject("Welcome to Tatua");
		// takes the stored content and sets it as the body of the email and tells the receipients email client its html not plain text
		message.setContent(htmlContent, "text/html; charset=utf-8");

		Transport.send(message);
		System.out.println("HTML Welcome Email sent successfully to " + EMAIL_TO);
	}
	
	// Creates and returns an authenitcated mail session
	private static Session getEmailSession() {
		return Session.getInstance(getGmailProperties(), new Authenticator() {
		    protected PasswordAuthentication getPasswordAuthentication() {
		        return new PasswordAuthentication(EMAIL_FROM, APP_PASSWORD);
		    }
		});
	}
	
	private static Properties getGmailProperties() {
		Properties prop = new Properties();
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.starttls.enable", "true");
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
		return prop;
	}
}