package com.hvault.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Patient receiving the prescription
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient;

    // Doctor who created it
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String medicines;

    private String duration;

    private String frequency;

    @Column(columnDefinition = "TEXT")
    private String reminderSchedule;

    private LocalDateTime createdAt;
}