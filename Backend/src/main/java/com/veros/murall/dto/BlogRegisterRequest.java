package com.veros.murall.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record BlogRegisterRequest(
        @NotNull(message = "O nome do blog é obrigatório")
        String blogName,
        @NotNull(message = "A url do blog é obrigatória")
        String blogUrl,
        @NotNull(message = "A url do blog é obrigatória")
        @Size(min = 1, message = "A lista de imagens deve ter pelo menos uma imagem.")
        List<String> blogImagesUrl
) {}
