package com.hvault.backend.service;

import java.security.GeneralSecurityException;
import java.security.Security;

import org.apache.http.HttpResponse;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;

@Service
public class WebPushService {

    private final PushService pushService;

    public WebPushService(
            @Value("${vapid.public.key}") String publicKey,
            @Value("${vapid.private.key}") String privateKey,
            @Value("${vapid.subject}") String subject)
            throws GeneralSecurityException {

        // Register Bouncy Castle security provider
        if (Security.getProvider(
                BouncyCastleProvider.PROVIDER_NAME
        ) == null) {

            Security.addProvider(
                    new BouncyCastleProvider()
            );
        }

        this.pushService = new PushService();

        this.pushService.setPublicKey(publicKey);
        this.pushService.setPrivateKey(privateKey);
        this.pushService.setSubject(subject);

        System.out.println(
                "Web Push Service initialized successfully."
        );
    }

    public boolean sendNotification(
        String endpoint,
        String p256dh,
        String auth,
        String message)  {

        try {

            Notification notification =
                    new Notification(
                            endpoint,
                            p256dh,
                            auth,
                            message
                    );

            HttpResponse response =
                    pushService.send(notification);

            int statusCode =
                    response
                            .getStatusLine()
                            .getStatusCode();

            String reason =
                    response
                            .getStatusLine()
                            .getReasonPhrase();

            System.out.println(
                    "Web Push response status: "
                            + statusCode
                            + " "
                            + reason
            );

            if (statusCode >= 200 &&
                    statusCode < 300) {

                System.out.println(
                        "✅ Push server accepted notification."
                );

                return true;
            }

            System.err.println(
                    "❌ Push server rejected notification."
            );

            return false;

        } catch (Exception e) {

            System.err.println(
                    "❌ Failed to send push notification: "
                            + e.getMessage()
            );

            e.printStackTrace();

            return false;
        }
    }
}