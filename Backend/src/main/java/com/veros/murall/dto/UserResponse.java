package com.veros.murall.dto;

import com.veros.murall.enums.UserRole;
import com.veros.murall.model.Blog;

import java.util.Date;
import java.util.List;

public record UserResponse(Long id, String username, String biografia, String email, UserRole role, Date createdAt, List<Blog> blogs) {
}
