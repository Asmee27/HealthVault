package com.hvault.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hvault.backend.entity.MedicalReport;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.MedicalReportRepository;
import com.hvault.backend.repository.UserRepository;

@Service
public class MedicalReportService {

    private final MedicalReportRepository medicalReportRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public MedicalReportService(
            MedicalReportRepository medicalReportRepository,
            UserRepository userRepository,
            CloudinaryService cloudinaryService) {

        this.medicalReportRepository = medicalReportRepository;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public String uploadReport(
            Long userId,
            MultipartFile file,
            String reportType,
            String notes) throws IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Please select a report file."
            );
        }

        // Upload file to Cloudinary
        String cloudinaryUrl =
                cloudinaryService.uploadFile(file);

        MedicalReport report =
                new MedicalReport();

        report.setUser(user);
        report.setReportType(reportType);
        report.setNotes(notes);

        report.setFileName(
                file.getOriginalFilename()
        );

        // filePath will now store the Cloudinary HTTPS URL
        report.setFilePath(cloudinaryUrl);

        medicalReportRepository.save(report);

        return "Report uploaded successfully";
    }

    public List<MedicalReport> getReportsByUser(
            Long userId) {

        return medicalReportRepository
                .findByUserId(userId);
    }

    public void deleteReport(Long id) {

        MedicalReport report =
                medicalReportRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Report not found"
                                ));

        medicalReportRepository.delete(report);
    }
}