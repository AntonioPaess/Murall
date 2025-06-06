package com.veros.murall.dto;

import java.util.List;

public record MurallDTO(
    Long blogId,
    String blogName,
    String blogDomain,
    String blogAvatar, // Avatar do blog, pode ser útil
    List<String> bannerImageUrls // Lista de URLs das imagens de banner
) {
}