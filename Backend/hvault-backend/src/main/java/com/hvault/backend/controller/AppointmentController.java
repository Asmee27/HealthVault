package com.hvault.backend.controller;

import com.hvault.backend.entity.Appointment;
import com.hvault.backend.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3001")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Doctor schedules an appointment
    @PostMapping
    public Appointment scheduleAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String appointmentDate,
            @RequestParam String appointmentTime,
            @RequestParam String purpose
    ) {

        return appointmentService.saveAppointment(
                patientId,
                doctorId,
                LocalDate.parse(appointmentDate),
                appointmentTime,
                purpose
        );
    }

    // Patient views upcoming appointments
    @GetMapping("/{patientId}")
    public List<Appointment> getUpcomingAppointments(
            @PathVariable Long patientId
    ) {

        return appointmentService.getUpcomingAppointments(patientId);
    }
}