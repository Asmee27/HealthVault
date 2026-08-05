package com.hvault.backend.repository;

import com.hvault.backend.entity.Appointment;
import com.hvault.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Upcoming appointments for a patient
    List<Appointment> findByPatientAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscAppointmentTimeAsc(
            User patient,
            LocalDate date
    );

}