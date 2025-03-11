package com.veros.murall.model.user.dto;

import com.veros.murall.model.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull(message = "Nome de usuário é obrigatório")
        @Size(min = 3, max = 20, message = "O nome de usuário deve ter entre 3 e 20 caracteres")
        String username,

        @NotNull(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @NotNull(message = "Senha é obrigatória")
        @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
        String password,

        @NotNull(message = "Papel é obrigatório")
        UserRole role
) {}