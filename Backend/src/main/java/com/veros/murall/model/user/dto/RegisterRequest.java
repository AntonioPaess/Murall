package com.veros.murall.model.user.dto;

import com.veros.murall.model.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(@NotBlank @Size(min = 3, max = 20) String username,
                              @NotBlank @Email String email,
                              @NotBlank @Size(min = 6)String password,
                              @NotNull UserRole role) {
}
