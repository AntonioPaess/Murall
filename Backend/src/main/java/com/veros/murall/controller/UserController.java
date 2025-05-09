package com.veros.murall.controller;

import com.veros.murall.model.Blog;
import com.veros.murall.model.User;
import com.veros.murall.dto.UserResponse;
import com.veros.murall.service.BlogService;
import com.veros.murall.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final BlogService blogService;

    public UserController(UserService userService, BlogService blogService) {
        this.userService = userService;
        this.blogService = blogService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Blog> blogs = blogService.getBlogsByUser(user.getId());
        user.setBlogs(blogs);
        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getBlogs());

        return ResponseEntity.ok(userResponse);
    }
}
