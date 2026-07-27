package com.hvault.backend.controller;

import com.hvault.backend.dto.RegisterRequest;
import com.hvault.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.hvault.backend.dto.LoginRequest;
import com.hvault.backend.dto.LoginResponse;
import com.hvault.backend.entity.User;
import com.hvault.backend.dto.UpdateProfileRequest;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/profile")
public User getProfile(@RequestParam String email) {
    return authService.getProfile(email);
}

@PutMapping("/profile")
public User updateProfile(
        @RequestParam String email,
        @RequestBody UpdateProfileRequest request) {

    return authService.updateProfile(email, request);
}
}