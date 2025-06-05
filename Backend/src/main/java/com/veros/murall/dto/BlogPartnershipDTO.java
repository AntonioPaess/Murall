package com.veros.murall.dto;

import java.time.LocalDateTime;

public record BlogPartnershipDTO(
        Long id,
        BlogSimpleDTO partnerBlog,
        LocalDateTime since
) {}