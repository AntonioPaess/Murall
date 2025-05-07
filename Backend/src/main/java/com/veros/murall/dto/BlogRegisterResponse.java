package com.veros.murall.dto;

import com.veros.murall.model.BlogImage;
import com.veros.murall.model.User;

import java.util.Date;
import java.util.List;

public record BlogRegisterResponse(Long id, String blogName, String blogUrl, List<BlogImage> blogImagesUrl, User user, Date createdAt) {
}
