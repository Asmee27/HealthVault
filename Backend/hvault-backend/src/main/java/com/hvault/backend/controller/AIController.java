package com.hvault.backend.controller;

import com.hvault.backend.dto.AIRequest;
import com.hvault.backend.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askAI(@RequestBody AIRequest request) {
        String question = request != null ? request.getQuestion() : null;

        if (question == null || question.trim().isBlank()) {
            return ResponseEntity.badRequest().body("Question is required.");
        }

        return ResponseEntity.ok(aiService.askGemini(question.trim()));
    }
}