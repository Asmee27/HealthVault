package com.hvault.backend.service;

import com.hvault.backend.entity.MedicalReport;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.MedicalReportRepository;
import com.hvault.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class MedicalReportService {

    private final MedicalReportRepository medicalReportRepository;
    private final UserRepository userRepository;

    public MedicalReportService(
            MedicalReportRepository medicalReportRepository,
            UserRepository userRepository) {

        this.medicalReportRepository = medicalReportRepository;
        this.userRepository = userRepository;
    }

    public String uploadReport(
            Long userId,
            MultipartFile file,
            String reportType,
            String notes) throws IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadDir);

        String originalFileName = file.getOriginalFilename() == null ? "report" : new File(file.getOriginalFilename()).getName();
        String fileName = System.currentTimeMillis() + "_" + originalFileName;
        Path targetFile = uploadDir.resolve(fileName);

        file.transferTo(targetFile.toFile());

        MedicalReport report = new MedicalReport();

        report.setUser(user);
        report.setReportType(reportType);
        report.setNotes(notes);
        report.setFileName(file.getOriginalFilename());
        report.setFilePath(targetFile.toString());

        medicalReportRepository.save(report);

        return "Report uploaded successfully";
    }

    public List<MedicalReport> getReportsByUser(Long userId) {
        return medicalReportRepository.findByUserId(userId);
    }
}