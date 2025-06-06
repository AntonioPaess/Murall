package com.veros.murall.dto;

import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        String username,
        String email,
        String avatar,
        @Size(min = 10, message = "A biografia deve ter no mínimo 10 caracteres.")
        String biography,
        String password
) {}
