package com.hvault.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "reminder_logs",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {
                "prescription_id",
                "reminder_slot",
                "reminder_date"
            }
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReminderLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @Column(name = "reminder_slot", nullable = false)
    private String reminderSlot;

    @Column(name = "reminder_date", nullable = false)
    private LocalDate reminderDate;
}