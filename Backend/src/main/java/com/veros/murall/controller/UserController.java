package com.veros.murall.controller;

import com.veros.murall.dto.*;
import com.veros.murall.model.Blog;
import com.veros.murall.model.User;
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

        List<BlogRegisterResponse> blogDtos = blogs.stream()
                .map(blog -> new BlogRegisterResponse(
                        blog.getId(),
                        blog.getBlogName(),
                        blog.getBlogDomain(),
                        blog.getBlogDescription(),
                        blog.getBlogImagesUrl(),
                        blog.getCategories().stream()
                                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                                .toList(),
                        new UserSimpleResponse(
                                user.getId(),
                                user.getUsername(),
                                user.getBiography(),
                                user.getEmail(),
                                user.getRole()
                        ),
                        blog.getCreatedAt()
                )).toList();

        return ResponseEntity.ok(new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getBiography(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                blogDtos
        ));
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

    @PutMapping("/{id}/set-role")
    public ResponseEntity<String> editUserRole(@PathVariable Long id, @RequestBody SetUserRoleRequest request) {
        try {
            userService.updateUserRole(id, request);
            return ResponseEntity.ok("Cargo atualizado com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao atualizar cargo do usuário.");
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

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationEmail(@RequestBody ResendVerificationRequest request) {
        try {
            userService.resendVerification(request.email());
            return ResponseEntity.ok("Um e-mail de verificação foi enviado para seu e-mail. Por favor, verifique sua caixa de entrada para ativar sua conta.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno no servidor. Tente novamente mais tarde.");
        }
    }

    @GetMapping("/reset-password/validate")
    public ResponseEntity<String> validateResetToken(@RequestParam String token) {
        try {
            boolean isValid = userService.validateResetToken(token);

            if (isValid) {
                return ResponseEntity.ok("Token válido.");
            } else {
                return ResponseEntity.status(HttpStatus.GONE).body("Token expirado ou inválido.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao validar token.");
        }
    }


}