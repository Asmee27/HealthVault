package com.hvault.backend.service;

import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hvault.backend.dto.LoginRequest;
import com.hvault.backend.dto.LoginResponse;
import com.hvault.backend.dto.RegisterRequest;
import com.hvault.backend.dto.UpdateProfileRequest;
import com.hvault.backend.entity.Role;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "Mobile number already registered";
        }

        
        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setGender(request.getGender());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setBloodGroup(request.getBloodGroup());
        user.setLicenseId(request.getLicenseId());
        user.setSignatureName(request.getSignatureName());
        user.setQrToken(UUID.randomUUID().toString());
        userRepository.save(user);

        return "Registration Successful";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .or(() -> userRepository.findByMobileNumber(request.getEmail()))
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponse(
                "Login Successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getRole().name(),
                user.getLicenseId(),
                user.getSignatureName()
        );
    }

    public User updateProfile(String identifier, UpdateProfileRequest request) {

        User user = findUserByIdentifier(identifier);

        user.setFullName(request.getFullName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setGender(request.getGender());
        user.setBloodGroup(request.getBloodGroup());
        user.setAddress(request.getAddress());

        return userRepository.save(user);
    }

    public User getProfile(String identifier) {
        return findUserByIdentifier(identifier);
    }

    private User findUserByIdentifier(String identifier) {
        return userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByMobileNumber(identifier))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getPatientByQrToken(String qrToken) {

    return userRepository.findByQrToken(qrToken)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
}

    public User getDoctorByEmail(String email) {

    User doctor = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

    if (doctor.getRole() != Role.DOCTOR) {
        throw new RuntimeException("User is not a doctor");
    }

    return doctor;
}
}