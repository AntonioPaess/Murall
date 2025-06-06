package com.veros.murall.dto;

public record ResetPasswordRequest(String token, String newPassword) {}