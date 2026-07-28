package com.hvault.backend.controller;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

}