package com.hvault.backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.hvault.backend.service.WebPushService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hvault.backend.entity.Prescription;
import com.hvault.backend.entity.PushSubscription;
import com.hvault.backend.entity.ReminderLog;
import com.hvault.backend.repository.PrescriptionRepository;
import com.hvault.backend.repository.PushSubscriptionRepository;
import com.hvault.backend.repository.ReminderLogRepository;

@Service
public class MedicineReminderScheduler {

    private final PrescriptionRepository prescriptionRepository;
    private final PushSubscriptionRepository pushSubscriptionRepository;
    private final ReminderLogRepository reminderLogRepository;
    private final WebPushService webPushService;
    private final ObjectMapper objectMapper;
    

    public MedicineReminderScheduler(
            PrescriptionRepository prescriptionRepository,
            PushSubscriptionRepository pushSubscriptionRepository,
            ReminderLogRepository reminderLogRepository,
            WebPushService webPushService,
            ObjectMapper objectMapper) {

        this.prescriptionRepository = prescriptionRepository;
        this.pushSubscriptionRepository = pushSubscriptionRepository;
        this.reminderLogRepository = reminderLogRepository;
        this.webPushService = webPushService;
        this.objectMapper = objectMapper;
    }

   @Scheduled(cron = "0 * * * * *", zone = "Asia/Kolkata")
    public void checkMedicineReminders() {

        LocalTime currentTime = LocalTime.now()
                .withSecond(0)
                .withNano(0);

        LocalDate today = LocalDate.now();

        List<Prescription> prescriptions =
                prescriptionRepository.findByReminderScheduleIsNotNull();

        for (Prescription prescription : prescriptions) {

            try {

                String scheduleJson = prescription.getReminderSchedule();

                if (scheduleJson == null || scheduleJson.isBlank()) {
                    continue;
                }

                Map<String, String> schedule =
                        objectMapper.readValue(
                                scheduleJson,
                                new TypeReference<Map<String, String>>() {}
                        );

                for (Map.Entry<String, String> entry : schedule.entrySet()) {

                    String slot = entry.getKey();
                    String timeValue = entry.getValue();

                    if (timeValue == null || timeValue.isBlank()) {
                        continue;
                    }

                    LocalTime reminderTime = LocalTime.parse(
                            timeValue,
                            DateTimeFormatter.ofPattern("HH:mm")
                    );

                    if (!currentTime.equals(reminderTime)) {
                        continue;
                    }

                    // Prevent duplicate reminder for same prescription,
                    // same slot and same day
                    boolean alreadySent =
                            reminderLogRepository
                                    .existsByPrescriptionAndReminderSlotAndReminderDate(
                                            prescription,
                                            slot,
                                            today
                                    );

                    if (alreadySent) {

                        System.out.println(
                                "Skipping duplicate reminder"
                                        + " | Prescription ID: "
                                        + prescription.getId()
                                        + " | Slot: "
                                        + slot
                        );

                        continue;
                    }

                    // Find patient's push subscription
                    PushSubscription subscription =
                            pushSubscriptionRepository
                                    .findByPatient(prescription.getPatient())
                                    .orElse(null);

                    if (subscription == null) {

                        System.out.println(
                                "No push subscription found for patient "
                                        + prescription.getPatient().getId()
                        );

                        continue;
                    }

                    String medicines = prescription.getMedicines();

                    String message = objectMapper.writeValueAsString(
                            Map.of(
                                    "title", "HealthVault 💊",
                                    "body",
                                    "It's time to take your medicine: "
                                            + medicines
                            )
                    );

                    // Send Web Push
                   boolean pushSent = webPushService.sendNotification(
        subscription.getEndpoint(),
        subscription.getP256dh(),
        subscription.getAuth(),
        message
);

if (!pushSent) {
    System.err.println(
            "Push failed - reminder will NOT be marked as sent"
                    + " | Prescription ID: "
                    + prescription.getId()
                    + " | Slot: "
                    + slot
    );

    continue;
}

ReminderLog reminderLog = ReminderLog.builder()
        .prescription(prescription)
        .reminderSlot(slot)
        .reminderDate(today)
        .build();

reminderLogRepository.save(reminderLog);

                    System.out.println(
                            "💊 Medicine reminder sent"
                                    + " | Prescription ID: "
                                    + prescription.getId()
                                    + " | Slot: "
                                    + slot
                                    + " | Time: "
                                    + reminderTime
                    );
                }

            } catch (Exception e) {

                System.err.println(
                        "Failed to process prescription "
                                + prescription.getId()
                                + ": "
                                + e.getMessage()
                );
            }
        }
    }
}