package com.hvault.backend.controller;

import com.hvault.backend.entity.MedicalReport;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.MedicalReportRepository;
import com.hvault.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class DoctorController {

    private final UserRepository userRepository;
    private final MedicalReportRepository medicalReportRepository;

    public DoctorController(UserRepository userRepository, MedicalReportRepository medicalReportRepository) {
        this.userRepository = userRepository;
        this.medicalReportRepository = medicalReportRepository;
    }

    @GetMapping("/qr/{qrToken}")
    public User getPatientByQr(@PathVariable String qrToken) {

        return userRepository.findByQrToken(qrToken)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @GetMapping("/patient/{qrToken}/reports")
    public List<MedicalReport> getPatientReports(@PathVariable String qrToken) {

        User user = userRepository.findByQrToken(qrToken)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return medicalReportRepository.findByUserId(user.getId());
    }
}