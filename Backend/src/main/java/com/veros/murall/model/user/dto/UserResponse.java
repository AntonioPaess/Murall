package com.veros.murall.model.user.dto;

import com.veros.murall.model.user.UserRole;

public record UserResponse(Long id, String username, String email, UserRole role) {
}
