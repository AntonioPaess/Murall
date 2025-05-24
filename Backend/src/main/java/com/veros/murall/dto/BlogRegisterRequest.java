package com.veros.murall.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record BlogRegisterRequest(
        @NotNull(message = "O nome do blog é obrigatório")
        String blogName,

        @NotNull(message = "O domínio do blog é obrigatório")
        String blogDomain,

        @NotNull(message = "A descrição do blog é obrigatório")
        @Size(min = 10, message = "A descrição deve ter pelo menos 10 caracteres.")
        String blogDescription,

        @NotNull(message = "A url do blog é obrigatória")
        @Size(min = 1, message = "A lista de imagens deve ter pelo menos uma imagem.")
        List<String> blogImagesUrl,

        List<String> categoryNames
) {}