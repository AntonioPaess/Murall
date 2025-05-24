package com.veros.murall.dto;

import com.veros.murall.enums.UserRole;

public record UserSimpleResponse(
        Long id,
        String username,
        String biography,
        String email,
        UserRole role
) {}