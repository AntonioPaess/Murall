package com.veros.murall.controller;

import com.veros.murall.util.JwtUtil;
import com.veros.murall.model.user.User;
import com.veros.murall.model.user.dto.LoginRequest;
import com.veros.murall.model.user.dto.RegisterRequest;
import com.veros.murall.model.user.dto.UserResponse;
import com.veros.murall.service.UserService;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    request.username(), request.password());
            Authentication authResult = authenticationManager.authenticate(authentication);
            String token = jwtUtil.generateToken(request.username());
            return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.createUser(request);
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuário criado com sucesso: " + userResponse);
    }
}