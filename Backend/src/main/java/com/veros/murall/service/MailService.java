package com.veros.murall.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {


@Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public String VerificacaoConta(String destinatario, String assunto, String mensagem){
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(remetente);
            simpleMailMessage.setTo(destinatario);
            simpleMailMessage.setSubject(assunto);
            simpleMailMessage.setText(mensagem);
            
            System.out.println("Tentando enviar email para: " + destinatario);
            mailSender.send(simpleMailMessage);
            System.out.println("Email enviado com sucesso para: " + destinatario);
            
            return "Email enviado";
        } catch (Exception e) {
            System.err.println("ERRO AO ENVIAR EMAIL: " + e.getMessage());
            e.printStackTrace(); // Importante para ver o stack trace completo
            return "Erro ao tentar enviar email: " + e.getMessage();
        }

}
}
