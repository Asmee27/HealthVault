package com.hvault.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hvault.backend.entity.PushSubscription;
import com.hvault.backend.entity.User;

public interface PushSubscriptionRepository
        extends JpaRepository<PushSubscription, Long> {

    Optional<PushSubscription> findByEndpoint(String endpoint);

    Optional<PushSubscription> findByPatient(User patient);
}