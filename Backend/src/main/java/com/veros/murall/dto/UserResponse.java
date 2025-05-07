package com.veros.murall.dto;

import com.veros.murall.enums.UserRole;

public record UserResponse(Long id, String username, String email, UserRole role) {
}
