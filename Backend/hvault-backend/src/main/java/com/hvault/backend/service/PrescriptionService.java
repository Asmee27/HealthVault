package com.hvault.backend.service;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.PrescriptionRepository;
import com.hvault.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               UserRepository userRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    public Prescription savePrescription(
            Long patientId,
            Long doctorId,
            String diagnosis,
            String medicines,
            String duration,
            String frequency) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Prescription prescription = Prescription.builder()
                .patient(patient)
                .doctor(doctor)
                .diagnosis(diagnosis)
                .medicines(medicines)
                .duration(duration)
                .frequency(frequency)
                .createdAt(LocalDateTime.now())
                .build();

        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> getPatientPrescriptions(Long patientId) {

    User patient = userRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

    return prescriptionRepository.findByPatientOrderByCreatedAtDesc(patient);
}

}