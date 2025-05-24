package com.veros.murall.controller;

import com.veros.murall.dto.BlogDomainRequest;
import com.veros.murall.dto.BlogRegisterRequest;
import com.veros.murall.exception.DomainAlreadyExistsException;
import com.veros.murall.model.Blog;
import com.veros.murall.model.User;
import com.veros.murall.service.BlogService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        }  catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Houve um problema ao criar o blog, domínio já registrado.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");

        }
    }

    @GetMapping
    public ResponseEntity<List<Blog>> readAllBlogs() {
        List<Blog> blogList = blogService.readBlogs();
        return ResponseEntity.ok(blogList);
    }

    @PostMapping("/check-unique")
    public ResponseEntity<String> isUniqueBlogDomain(@RequestBody BlogDomainRequest request) {
        try {
            boolean isDomain = blogService.existsByDomain(request.blogDomain());
            if (isDomain) {
                return ResponseEntity.ok("Domínio inválido");
            }
            return ResponseEntity.ok("Domínio válido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBlog (@RequestBody BlogRegisterRequest request, @PathVariable Long id) {
        try {
            blogService.updateBlog(request, id);
            return ResponseEntity.ok("Blog com ID: " + id + " foi alterado com sucesso");
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok("Blog deletado com sucesso.");
        }   catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }
}
