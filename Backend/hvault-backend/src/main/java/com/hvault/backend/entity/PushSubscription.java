package com.hvault.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PushSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Patient who owns this notification subscription
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    // Browser push endpoint
    @Column(columnDefinition = "TEXT", nullable = false)
    private String endpoint;

    // Web Push public key
    @Column(columnDefinition = "TEXT", nullable = false)
    private String p256dh;

    // Web Push authentication secret
    @Column(columnDefinition = "TEXT", nullable = false)
    private String auth;
}