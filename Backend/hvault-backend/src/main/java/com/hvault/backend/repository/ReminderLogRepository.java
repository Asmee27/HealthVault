package com.hvault.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hvault.backend.entity.Prescription;
import com.hvault.backend.entity.ReminderLog;

public interface ReminderLogRepository extends JpaRepository<ReminderLog, Long> {

    boolean existsByPrescriptionAndReminderSlotAndReminderDate(
            Prescription prescription,
            String reminderSlot,
            LocalDate reminderDate
    );
     void deleteByPrescription(Prescription prescription);
}