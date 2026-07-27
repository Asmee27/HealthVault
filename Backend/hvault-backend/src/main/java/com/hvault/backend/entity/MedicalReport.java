package com.hvault.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "medical_reports")
@Getter
@Setter
public class MedicalReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportType;

    private String notes;

    private String fileName;

    private String filePath;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}