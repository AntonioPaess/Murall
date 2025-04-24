package com.veros.murall.service;


import com.veros.murall.model.user.UserSituation;
import com.veros.murall.model.user.User;
import com.veros.murall.model.user.UserVerified;
import com.veros.murall.model.user.dto.RegisterRequest;
import com.veros.murall.repository.UserRepository;
import com.veros.murall.repository.UserVerifiedRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final UserVerifiedRepository verifiedRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailService mailService, UserVerifiedRepository verifiedRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.verifiedRepository = verifiedRepository;
    }

    public void createUser(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setSituation(UserSituation.PENDENTE);
        user.setRole(request.role());
        userRepository.save(user);

        UserVerified verified = new UserVerified();
        verified.setEntity(user);
        verified.setUuid(UUID.randomUUID());
        verified.setExpInstant(Instant.now().plusMillis(900000));
        verifiedRepository.save(verified);

        String html = """
<html>
  <head>
    <style>
      body {
        background-color: #0d1522;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #083d6d;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header img {
        max-width: 180px;
        height: auto;
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: #083d6d;
        text-align: center;
        margin-bottom: 20px;
      }
      .content {
        font-size: 16px;
        color: #0d1522;
        line-height: 1.5;
        text-align: center;
      }
      .button {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 24px;
        background-color: #2f86c8;
        color: #fcfcfc;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 13px;
        color: #6c757d;
        text-align: center;
      }
      .footer a {
        color: #2f86c8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://i.imgur.com/Nc5lxv0.png" alt="Murall Logo">
      </div>
      <div class="title">Verifique sua conta no Murall</div>
      <div class="content">
        Olá! 👋<br><br>
        Obrigado por se registrar no <strong>Murall</strong>.<br>
        Para confirmar sua conta e começar a usar a plataforma, clique no botão abaixo:
        <br><br>
        <a href="http://localhost:8080/api/auth/verifyUser/%s"
           style="display:inline-block;padding:12px 24px;background-color:#2f86c8;color:#fcfcfc;text-decoration:none;border-radius:5px;font-weight:bold;">
           Verificar Conta
        </a>
        <br><br>
        Este link expira em 15 minutos.
        <br><br>
        Se você não solicitou este cadastro, ignore este e-mail.
      </div>
      <div class="footer">
        © 2025 Murall • <a href="https://murall.com/politica-de-privacidade">Política de Privacidade</a>
      </div>
    </div>
  </body>
</html>
""".formatted(verified.getUuid());

        mailService.sendAccountVerificationEmail(request.email(),
        "\uD83D\uDE80 Bem-vindo ao Murall! Só falta verificar seu email", html);
    }

    @Transactional
    public String verifierUser(String uuid) {
        try {
            Optional<UserVerified> userVerifierOpt = verifiedRepository.findByUuid(UUID.fromString(uuid));
            
            if (userVerifierOpt.isPresent()) {
                UserVerified userVerifier = userVerifierOpt.get();
                
                if (userVerifier.getExpInstant().compareTo(Instant.now()) >= 0) {
                    User user = userVerifier.getEntity();
                    user.setSituation(UserSituation.ATIVO);
                    
                    userRepository.save(user);
                    
                    verifiedRepository.delete(userVerifier);
                    
                    return "Usuário Verificado com Sucesso! Pode fechar essa aba.";
                } else {
                    verifiedRepository.delete(userVerifier);
                    return "Tempo de verificação expirado!";
                }
            } else {
                return "Código de verificação inválido ou não encontrado!";
            }
        } catch (Exception e) {
            System.err.println("Erro ao verificar usuário: " + e.getMessage());
            return "Erro ao processar verificação: " + e.getMessage();
        }
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
