package com.veros.murall.service;


import com.veros.murall.model.enums.UserSituation;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    @Autowired
    private UserVerifiedRepository verifiedRepository; 

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

        mailService.VerificacaoConta(request.email(), 
        "Novo usuario cadastrado",
        "Você está recebendo o email de cadastro no MurAll! Para ser verificado basta clicar no link " + verified.getUuid());   
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
                    verifiedRepository.delete(userVerifier);
                    return "Tempo de verificação expirado!";
                }
            } else {
                return "Código de verificação inválido ou não encontrado!";
            }
        } catch (Exception e) {
            System.err.println("Erro ao verificar usuário: " + e.getMessage());
            e.printStackTrace();
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
