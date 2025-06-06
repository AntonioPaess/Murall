package com.veros.murall.dto;

public record PartnershipRequest(
        Long senderBlogId,
        Long receiverBlogId
) {}