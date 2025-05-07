package com.veros.murall.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


import com.veros.murall.model.UserVerified;

public interface UserVerifiedRepository extends JpaRepository<UserVerified, Long> {

    Optional<UserVerified> findByUuid(UUID uuid);

}
