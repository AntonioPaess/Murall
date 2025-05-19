package com.veros.murall.dto;

public record UpdateUserRequest(
        String username,
        String email,
        String password
) {}
