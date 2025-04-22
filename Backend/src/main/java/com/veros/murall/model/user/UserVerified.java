package com.veros.murall.model.user;

import java.time.Instant;
import java.util.UUID;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "NPL_VERIFIED_USER")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class UserVerified {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private Instant expInstant;

    @ManyToOne
    @JoinColumn(name  = "ID_USUARIO", referencedColumnName = "id", unique = true)
    private User entity;

}
