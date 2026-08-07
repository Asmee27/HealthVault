package com.hvault.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.service.PrescriptionService;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3001")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public Prescription savePrescription(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String diagnosis,
            @RequestParam String medicines,
            @RequestParam String duration,
            @RequestParam String frequency
    ) {

        return prescriptionService.savePrescription(
                patientId,
                doctorId,
                diagnosis,
                medicines,
                duration,
                frequency
        );
    }

    @GetMapping("/{patientId}")
public List<Prescription> getPatientPrescriptions(@PathVariable Long patientId) {
    return prescriptionService.getPatientPrescriptions(patientId);
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deletePrescription(@PathVariable Long id) {

    prescriptionService.deletePrescription(id);

    return ResponseEntity.ok("Prescription deleted successfully");
}

}