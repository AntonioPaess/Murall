package com.veros.murall.dto;

import com.veros.murall.enums.BlogPartnersSituation;
import java.time.LocalDateTime;

public record PartnershipResponse(
        Long id,
        BlogSimpleDTO senderBlog,
        BlogSimpleDTO receiverBlog,
        BlogPartnersSituation situation,
        LocalDateTime requestDate,
        LocalDateTime updateDate
) {}