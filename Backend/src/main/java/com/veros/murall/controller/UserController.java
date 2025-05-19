package com.veros.murall.controller;

import com.veros.murall.dto.ForgotPasswordRequest;
import com.veros.murall.dto.ResetPasswordRequest;
import com.veros.murall.dto.UpdateUserRequest;
import com.veros.murall.model.Blog;
import com.veros.murall.model.User;
import com.veros.murall.dto.UserResponse;
import com.veros.murall.service.BlogService;
import com.veros.murall.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
                user.getBiografia(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getBlogs());

        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        try {
            userService.updateUser(id, request);
            return ResponseEntity.ok("Usuário atualizado com sucesso.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar usuário.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("Usuário deletado com sucesso.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar usuário.");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> sendResetPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            userService.sendResetPasswordEmail(request.email());
            return ResponseEntity.ok("Link de redefinição de senha enviado com sucesso.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar solicitação. Tente novamente mais tarde.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.token(), request.newPassword());
            return ResponseEntity.ok("Senha redefinida com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao redefinir a senha. Tente novamente.");
        }
    }
}