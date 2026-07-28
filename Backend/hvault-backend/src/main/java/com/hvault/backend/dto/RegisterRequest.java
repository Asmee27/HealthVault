package com.hvault.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String mobileNumber;

    @NotBlank
    private String password;

    private String gender;

    private LocalDate dateOfBirth;

    private String bloodGroup;

    
}