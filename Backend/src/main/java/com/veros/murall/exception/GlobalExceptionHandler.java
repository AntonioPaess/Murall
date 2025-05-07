package com.veros.murall.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro: " + errorMessage);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String message = ex.getRootCause() != null ? ex.getRootCause().getMessage() : ex.getMessage();

        if (message != null) {
            if (message.contains("blog_url")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: URL do blog já está em uso.");
            } else if (message.contains("blog_name")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: Nome do blog já está em uso.");
            } else if (message.contains("email")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: Email já está em uso.");
            } else if (message.contains("username")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: Nome de usuário já está em uso.");
            }
        }

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Erro: Violação de integridade de dados.");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro interno no servidor: " + ex.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handlerBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Credenciais inválidas. Tente novamente.");
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<String> handleDisabledUser(DisabledException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Usuário inativo. Verifique sua conta.");
    }
}