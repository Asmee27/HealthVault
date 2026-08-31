package com.hvault.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hvault.backend.entity.PushSubscription;
import com.hvault.backend.entity.User;
import com.hvault.backend.repository.PushSubscriptionRepository;
import com.hvault.backend.repository.UserRepository;
import com.hvault.backend.service.WebPushService;

@RestController
@RequestMapping("/api/push")
@CrossOrigin(origins = "http://localhost:3000")
public class PushSubscriptionController {

    private final PushSubscriptionRepository pushSubscriptionRepository;
    private final UserRepository userRepository;
    private final WebPushService webPushService;

    public PushSubscriptionController(
            PushSubscriptionRepository pushSubscriptionRepository,
            UserRepository userRepository,
            WebPushService webPushService) {

        this.pushSubscriptionRepository = pushSubscriptionRepository;
        this.userRepository = userRepository;
        this.webPushService = webPushService;
    }

    // Save patient's browser push subscription
    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(
            @RequestParam Long patientId,
            @RequestParam String endpoint,
            @RequestParam String p256dh,
            @RequestParam String auth) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        PushSubscription subscription =
                pushSubscriptionRepository.findByEndpoint(endpoint)
                        .orElse(new PushSubscription());

        subscription.setPatient(patient);
        subscription.setEndpoint(endpoint);
        subscription.setP256dh(p256dh);
        subscription.setAuth(auth);

        pushSubscriptionRepository.save(subscription);

        return ResponseEntity.ok(
                "Push subscription saved successfully"
        );
    }

    // Temporary endpoint for testing Web Push
    @PostMapping("/test")
    public ResponseEntity<?> testPush(
            @RequestParam Long patientId) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        PushSubscription subscription =
                pushSubscriptionRepository.findByPatient(patient)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Push subscription not found for patient"
                                )
                        );

        String message = """
                {
                  "title": "HealthVault 💊",
                  "body": "Time to take your medicine. This is a test reminder."
                }
                """;

        webPushService.sendNotification(
                subscription.getEndpoint(),
                subscription.getP256dh(),
                subscription.getAuth(),
                message
        );

        return ResponseEntity.ok(
                "Test push notification sent"
        );
    }
}