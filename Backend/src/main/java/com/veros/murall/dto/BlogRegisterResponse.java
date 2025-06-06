package com.veros.murall.dto;

import java.util.Date;
import java.util.List;

public record BlogRegisterResponse(
        Long id,
        String blogName,
        String blogDomain,
        String blogDescription,
        String blogAvatar,
        List<BlogImageResponse> blogImagesUrl,
        List<CategoryResponse> categories,
        UserSimpleResponse user,
        Date createdAt
) {}