package com.hvault.backend.controller;

import com.hvault.backend.entity.User;
import com.hvault.backend.repository.UserRepository;
import com.hvault.backend.service.QRService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class QRController {

    private final QRService qrService;
    private final UserRepository userRepository;

    public QRController(QRService qrService, UserRepository userRepository) {
        this.qrService = qrService;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQRCode(@PathVariable Long id) throws Exception {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] qr = qrService.generateQRCode(user.getQrToken());

        return ResponseEntity.ok(qr);
    }
}