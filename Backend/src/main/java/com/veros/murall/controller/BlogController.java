package com.veros.murall.controller;

import com.veros.murall.dto.BlogRegisterRequest;
import com.veros.murall.dto.BlogRegisterResponse;
import com.veros.murall.model.User;
import com.veros.murall.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping
    public ResponseEntity<BlogRegisterResponse> createBlog(@RequestBody BlogRegisterRequest blogToBeCreated, @AuthenticationPrincipal User user) {
        try {
            blogService.createBlog(blogToBeCreated, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(null);
        }
    }
}
