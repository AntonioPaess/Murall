package com.veros.murall.repository;

import com.veros.murall.model.PasswordResetToken;
import com.veros.murall.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user); // útil para cleanup
}