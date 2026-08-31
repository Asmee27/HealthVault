package com.hvault.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.PrescriptionRepository;
import com.hvault.backend.repository.ReminderLogRepository;
import com.hvault.backend.repository.UserRepository;

@Service
public class PrescriptionService {

    private static final Logger logger = LoggerFactory.getLogger(PrescriptionService.class);

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;
    private final ReminderLogRepository reminderLogRepository;
    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               UserRepository userRepository,
                               ReminderLogRepository reminderLogRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
        this.reminderLogRepository = reminderLogRepository;
    }

    public Prescription savePrescription(
            Long patientId,
            Long doctorId,
            String diagnosis,
            String medicines,
            String duration,
            String frequency,
        String reminderSchedule) {

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
                .reminderSchedule(reminderSchedule)
                .createdAt(LocalDateTime.now())
                .build();

        try {
            return prescriptionRepository.save(prescription);
        } catch (Exception e) {
            logger.error("Failed to save prescription", e);
            throw e;
        }
    }

    public List<Prescription> getPatientPrescriptions(Long patientId) {

    User patient = userRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

    return prescriptionRepository.findByPatientOrderByCreatedAtDesc(patient);
}

@Transactional
public void deletePrescription(Long id) {

    Prescription prescription =
            prescriptionRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Prescription not found"
                            ));

    reminderLogRepository
            .deleteByPrescription(prescription);

    prescriptionRepository.delete(prescription);
}

}