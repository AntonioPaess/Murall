package com.veros.murall.model;

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
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "NPL_VERIFIED_USER")
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

    public void setEntity(User user) {
        this.entity = user;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public void setExpInstant(Instant expInstant) {
        this.expInstant = expInstant;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public Instant getExpInstant() {
        return this.expInstant;
    }

    public User getEntity() {
        return this.entity;
    }
}
