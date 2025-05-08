package com.veros.murall.controller;

import com.veros.murall.dto.BlogRegisterRequest;
import com.veros.murall.exception.DomainAlreadyExistsException;
import com.veros.murall.model.User;
import com.veros.murall.service.BlogService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> createBlog(
            @RequestBody BlogRegisterRequest blogToBeCreated,
            @AuthenticationPrincipal User user) {

        try {
            blogService.createBlog(blogToBeCreated, user);
            return ResponseEntity.ok("Blog criado com sucesso!");
        } catch (DomainAlreadyExistsException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Houve um problema ao criar o blog, domínio já registrado.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");

        }
    }
}
