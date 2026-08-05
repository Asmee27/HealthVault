package com.hvault.backend.controller;

import com.hvault.backend.entity.User;
import com.hvault.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PatientController {

    private final UserRepository userRepository;

    public PatientController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/scan/{token}")
    public User getPatientByToken(@PathVariable String token) {

        return userRepository.findByQrToken(token)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}