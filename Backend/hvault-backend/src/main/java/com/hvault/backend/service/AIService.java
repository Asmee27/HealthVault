package com.hvault.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.List;

@Service
public class AIService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String askGemini(String question) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        Map<String, Object> body = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                Map.of(
                    "role", "system",
                    "content", "You are HVault AI, a concise medical record assistant. Respond in a warm, structured format with a brief summary, 2 to 4 bullet points for notable findings, and 1 short next-step suggestion. Avoid diagnosing. If the user asks about a record, refer only to the provided details and keep the tone clear and calm."),
                        Map.of(
                                "role", "user",
                                "content", question)),
                "temperature", 0.3);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Map<?, ?> choice = (Map<?, ?>) ((List<?>) response.getBody().get("choices")).get(0);

        Map<?, ?> message = (Map<?, ?>) choice.get("message");

        return message.get("content").toString();

    }
}