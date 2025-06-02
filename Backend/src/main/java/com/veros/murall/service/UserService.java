package com.veros.murall.service;

import com.veros.murall.dto.SetUserRoleRequest;
import com.veros.murall.dto.UpdateUserRequest;
import com.veros.murall.enums.UserSituation;
import com.veros.murall.model.PasswordResetToken;
import com.veros.murall.model.User;
import com.veros.murall.model.UserVerified;
import com.veros.murall.dto.RegisterRequest;
import com.veros.murall.repository.PasswordResetTokenRepository;
import com.veros.murall.repository.UserRepository;
import com.veros.murall.repository.UserVerifiedRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final UserVerifiedRepository verifiedRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            MailService mailService,
            UserVerifiedRepository verifiedRepository,
            PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.verifiedRepository = verifiedRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public void createUser(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setSituation(UserSituation.PENDENTE);
        userRepository.save(user);

        UserVerified verified = new UserVerified();
        verified.setEntity(user);
        verified.setUuid(UUID.randomUUID());
        verified.setExpInstant(Instant.now().plusMillis(900000));
        verifiedRepository.save(verified);

        String html = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verifique sua conta no Murall</title>
</head>
<body style="margin:10;padding:0;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;padding:30px;box-shadow:0 4px 10px rgba(0,0,0,0.15);">
        <div style="text-align:center;margin-bottom:30px;">
            <img src="https://i.imgur.com/Nc5lxv0.png" alt="Murall Logo" width="180" style="max-width:180px;height:auto;border:0;" />
        </div>
        <div style="font-size:22px;font-weight:bold;color:#083d6d;text-align:center;margin-bottom:20px;">
            Verifique sua conta no Murall
        </div>
        <div style="font-size:16px;color:#0d1522;line-height:1.5;text-align:center;">
            Olá! 👋<br/><br/>
            Obrigado por se registrar no <strong>Murall</strong>.<br/>
            Para confirmar sua conta e começar a usar a plataforma, clique no botão abaixo:
            <br/><br/>
            <a href="http://localhost:3000/verify/%s"
               style="display:inline-block;margin-top:25px;padding:12px 24px;background-color:#2f86c8;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;font-family:Arial,sans-serif;">
               Verificar Conta
            </a>
            <br/><br/>
            Este link expira em 15 minutos.
            <br/><br/>
            Se você não solicitou este cadastro, ignore este e-mail.
        </div>
        <div style="margin-top:40px;font-size:13px;color:#6c757d;text-align:center;">
            © 2025 Murall • <a href="https://murall-xi.vercel.app/privacy" style="color:#2f86c8;text-decoration:none;">Política de Privacidade</a>
        </div>
    </div>
</body>
</html>
""".formatted(verified.getUuid());

        mailService.sendAccountVerificationEmail(request.email(),
        "\uD83D\uDE80 Bem-vindo ao Murall! Só falta verificar seu email", html);
    }

    public void resendVerification(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("O email não pode estar vazio.");
        }

        String cleanEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com este email."));

        UserVerified existingVerification = verifiedRepository.findByEntityId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Sua conta já foi verificada. Não é possível reenviar o email de verificação."));

        if (!existingVerification.getExpInstant().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Você já possui um link de verificação válido. Verifique seu e-mail.");
        }

        verifiedRepository.delete(existingVerification);

        UserVerified verified = new UserVerified();
        verified.setEntity(user);
        verified.setUuid(UUID.randomUUID());
        verified.setExpInstant(Instant.now().plusMillis(900_000)); // 15 minutos
        verifiedRepository.save(verified);

        String html = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verifique sua conta no Murall</title>
</head>
<body style="margin:10;padding:0;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;padding:30px;box-shadow:0 4px 10px rgba(0,0,0,0.15);">
        <div style="text-align:center;margin-bottom:30px;">
            <img src="https://i.imgur.com/Nc5lxv0.png" alt="Murall Logo" width="180" style="max-width:180px;height:auto;border:0;" />
        </div>
        <div style="font-size:22px;font-weight:bold;color:#083d6d;text-align:center;margin-bottom:20px;">
            Verifique sua conta no Murall
        </div>
        <div style="font-size:16px;color:#0d1522;line-height:1.5;text-align:center;">
            Olá! 👋<br/><br/>
            Obrigado por se registrar no <strong>Murall</strong>.<br/>
            Para confirmar sua conta e começar a usar a plataforma, clique no botão abaixo:
            <br/><br/>
            <a href="http://localhost:3000/verify/%s"
               style="display:inline-block;margin-top:25px;padding:12px 24px;background-color:#2f86c8;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;font-family:Arial,sans-serif;">
               Verificar Conta
            </a>
            <br/><br/>
            Este link expira em 15 minutos.
            <br/><br/>
            Se você não solicitou este cadastro, ignore este e-mail.
        </div>
        <div style="margin-top:40px;font-size:13px;color:#6c757d;text-align:center;">
            © 2025 Murall • <a href="https://murall-xi.vercel.app/privacy" style="color:#2f86c8;text-decoration:none;">Política de Privacidade</a>
        </div>
    </div>
</body>
</html>
""".formatted(verified.getUuid());

        mailService.sendAccountVerificationEmail(
                cleanEmail,
                "🚀 Bem-vindo ao Murall! Só falta verificar seu email",
                html
        );
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
                    
                    return "Usuário Verificado com Sucesso!";
                } else {
                    return "Tempo de verificação expirado!";
                }
            } else {
                return "Este código já foi utilizado ou sua conta já está confirmada.";
            }
        } catch (Exception e) {
            System.err.println("Erro ao verificar usuário: " + e.getMessage());
            return "Erro ao processar verificação: " + e.getMessage();
        }
    }

    public void updateUserRole(Long id, SetUserRoleRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

        if (request.role() != null) {
            user.setRole(request.role());
        } else {
            throw new IllegalArgumentException("Informe um cargo válido para o usuário.");
        }

        userRepository.save(user);
    }

    @Transactional
    public void updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

        if (request.username() != null) {
            user.setUsername(request.username());
        }
        if (request.email() != null) {
            user.setEmail(request.email());
        }
        if (request.password() != null) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        if (request.biography() != null) {
            user.setBiography(request.biography());
        }

        if (request.avatar() != null) {
            user.setAvatar(request.avatar());
        }
        
        userRepository.save(user);
    }

    @Transactional
    public void deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado com ID: " + id);
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public void sendResetPasswordEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o e-mail informado."));

        passwordResetTokenRepository.deleteByUser(user); // Limpa tokens antigos

        PasswordResetToken token = new PasswordResetToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiration(Instant.now().plusSeconds(900)); // 15 minutos
        passwordResetTokenRepository.save(token);

        String link = "http://localhost:3000/reset-password/" + token.getToken();

        String html = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redefinição de Senha - Murall</title>
    <style type="text/css">
      /* Estilos base (para clients que suportam <style>) */
      body {
        margin: 10;
        padding: 0;
        font-family: Arial, sans-serif;
        color: #083d6d;
      }
    </style>
  </head>
  <body>
    <!-- Container principal com CSS inline -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://i.imgur.com/Nc5lxv0.png" alt="Murall Logo" style="max-width: 180px; height: auto;" />
      </div>

      <!-- Título -->
      <div style="font-size: 22px; font-weight: bold; color: #083d6d; text-align: center; margin-bottom: 20px;">
        Redefinição de Senha - Murall
      </div>

      <!-- Conteúdo -->
      <div style="font-size: 16px; color: #0d1522; line-height: 1.5; text-align: center;">
        Olá, <strong>%s</strong> 👋<br /><br />
        Recebemos uma solicitação para redefinir sua senha.<br />
        Se foi você, clique no botão abaixo para criar uma nova senha:
        <br /><br />
        <a href="%s"
           style="display: inline-block; margin-top: 25px; padding: 12px 24px; background-color: #2f86c8; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
           Redefinir Senha
        </a>
        <br /><br />
        Este link expira em 15 minutos.
        <br /><br />
        Se você não solicitou essa redefinição, apenas ignore este e-mail.
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; font-size: 13px; color: #6c757d; text-align: center;">
        © 2025 Murall • <a href="https://murall-xi.vercel.app/privacy" style="color: #2f86c8; text-decoration: none;">Política de Privacidade</a>
      </div>
    </div>
  </body>
</html>
""".formatted(user.getUsername(), link);

        mailService.sendPasswordResetEmail(
                user.getEmail(),
                "🔒 Redefinição de Senha - Murall",
                html
        );
    }

    public void resetPassword(String tokenValue, String newPassword) {
        PasswordResetToken token = passwordResetTokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido."));

        if (token.getExpiration().isBefore(Instant.now())) {
            deleteExpiredToken(token);
            throw new IllegalArgumentException("Tempo limite atingido, tente novamente.");
        }

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(token);
    }

    @Transactional
    public void deleteExpiredToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }

    public boolean validateResetToken (String token) {
        Optional<PasswordResetToken> optionalToken = passwordResetTokenRepository.findByToken(token);
        return optionalToken.isPresent() && !optionalToken.get().getExpiration().isBefore(Instant.now());
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
