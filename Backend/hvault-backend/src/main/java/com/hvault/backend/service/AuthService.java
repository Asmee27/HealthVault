package com.hvault.backend.service;

import com.hvault.backend.dto.LoginRequest;
import com.hvault.backend.dto.RegisterRequest;
import com.hvault.backend.dto.LoginResponse;
import com.hvault.backend.entity.Role;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.hvault.backend.dto.UpdateProfileRequest;

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
        user.setRole(Role.PATIENT);

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
                user.getRole().name()
        );
    }

    public User updateProfile(String email, UpdateProfileRequest request) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setFullName(request.getFullName());
    user.setDateOfBirth(request.getDateOfBirth());
    user.setGender(request.getGender());
    user.setBloodGroup(request.getBloodGroup());
    user.setAddress(request.getAddress());

    return userRepository.save(user);
}

    public User getProfile(String email) {
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
}
}