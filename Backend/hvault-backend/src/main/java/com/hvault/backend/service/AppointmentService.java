package com.hvault.backend.service;

import com.hvault.backend.entity.Appointment;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.AppointmentRepository;
import com.hvault.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    // Doctor schedules an appointment
    public Appointment saveAppointment(
            Long patientId,
            Long doctorId,
            LocalDate date,
            String time,
            String purpose) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(date)
                .appointmentTime(java.time.LocalTime.parse(time))
                .purpose(purpose)
                .status("Scheduled")
                .build();

        return appointmentRepository.save(appointment);
    }

    // Patient's upcoming appointments
    public List<Appointment> getUpcomingAppointments(Long patientId) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return appointmentRepository
                .findByPatientAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscAppointmentTimeAsc(
                        patient,
                        LocalDate.now()
                );
    }
}