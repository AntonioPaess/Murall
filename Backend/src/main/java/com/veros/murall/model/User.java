package com.veros.murall.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.veros.murall.enums.UserRole;
import com.veros.murall.enums.UserSituation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.validation.constraints.Size;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Size(min = 3, max = 20, message = "O nome de usuário deve ter entre 3 e 20 caracteres.")
    private String username;

    @Column(nullable = false)
    @Size(min = 10, message = "A biografia deve ter no mínimo 10 caracteres.")
    private String biografia;

    @Column(nullable = false)
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserSituation situation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Blog> blogs;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isEnabled() {
        return this.situation == UserSituation.ATIVO;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
