package com.veros.murall.dto;

public record BlogSimpleDTO(
        Long id,
        String blogName,
        String blogDomain,
        String blogAvatar
) {}