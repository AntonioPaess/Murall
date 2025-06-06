package com.veros.murall.dto;

import com.veros.murall.enums.UserRole;

import java.util.Date;
import java.util.List;

public record UserResponse(
        Long id,
        String username,
        String biography,
        String avatar,
        String email,
        UserRole role,
        Date createdAt,
        List<BlogRegisterResponse> blogs
) {}