package com.hvault.backend.repository;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findByPatientOrderByCreatedAtDesc(User patient);

    // Used by the medicine reminder scheduler
    List<Prescription> findByReminderScheduleIsNotNull();
}