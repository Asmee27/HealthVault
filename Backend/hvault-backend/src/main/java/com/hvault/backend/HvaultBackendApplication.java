package com.hvault.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HvaultBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HvaultBackendApplication.class, args);
    }
}