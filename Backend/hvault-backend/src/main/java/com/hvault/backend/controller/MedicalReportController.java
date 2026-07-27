package com.hvault.backend.controller;

import com.hvault.backend.service.MedicalReportService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.hvault.backend.entity.MedicalReport;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class MedicalReportController {

    private final MedicalReportService medicalReportService;

    public MedicalReportController(MedicalReportService medicalReportService) {
        this.medicalReportService = medicalReportService;
    }

    @GetMapping("/ping")
    public String ping() {
        return this.medicalReportService != null ? "ok" : "unavailable";
    }

    @PostMapping("/upload")
public String uploadReport(
        @RequestParam("userId") Long userId,
        @RequestParam("file") MultipartFile file,
        @RequestParam("reportType") String reportType,
        @RequestParam("notes") String notes) throws Exception {

    return medicalReportService.uploadReport(
            userId,
            file,
            reportType,
            notes
    );
}

@GetMapping("/{userId}")
public List<MedicalReport> getReports(
        @PathVariable Long userId) {

    return medicalReportService.getReportsByUser(userId);

}

}