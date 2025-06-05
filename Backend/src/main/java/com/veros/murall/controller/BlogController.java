package com.veros.murall.controller;

import com.veros.murall.dto.*;

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
import java.util.Optional;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<BlogRegisterResponse>> readAllBlogs() {
        List<Blog> blogList = blogService.readBlogs();

        List<BlogRegisterResponse> blogResponseList = blogList.stream()
                .map(blog -> new BlogRegisterResponse(
                        blog.getId(),
                        blog.getBlogName(),
                        blog.getBlogDomain(),
                        blog.getBlogDescription(),
                        blog.getBlogAvatar(),
                        blog.getBlogImagesUrl().stream()
                                .map(blogImage -> new BlogImageResponse(blogImage.getId(), blogImage.getImageUrl()))
                                .collect(Collectors.toList()),
                        blog.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                                .collect(Collectors.toList()),
                        new UserSimpleResponse(
                                blog.getUser().getId(),
                                blog.getUser().getUsername(),
                                blog.getUser().getBiography(),
                                blog.getUser().getEmail(),
                                blog.getUser().getRole()
                        ),
                        blog.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(blogResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogRegisterResponse> listBlogById(@PathVariable Long id) {
        try {
            Optional<Blog> optionalBlog = blogService.getBlogById(id);
            if (optionalBlog.isPresent()) {
                Blog blog = optionalBlog.get();

                BlogRegisterResponse blogRegisterResponse = blogService.mapToBlogRegisterResponse(blog);

                return ResponseEntity.ok(blogRegisterResponse);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new BlogRegisterResponse(
                            null,
                            "Blog não encontrado",
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BlogRegisterResponse(
                            null,
                            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null
                    ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BlogRegisterResponse>> listBlogByUserId(@PathVariable Long userId) {
        try {
            List<Blog> blogs = blogService.getBlogsByUser(userId);

            if (blogs != null && !blogs.isEmpty()) {
                List<BlogRegisterResponse> blogRegisterResponses = blogs.stream()
                        .map(blogService::mapToBlogRegisterResponse)
                        .collect(Collectors.toList());

                return ResponseEntity.ok(blogRegisterResponses);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(List.of(new BlogRegisterResponse(
                            null,
                            "Blog não encontrado",
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null
                    )));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of(new BlogRegisterResponse(
                            null,
                            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null
                    )));
        }
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
