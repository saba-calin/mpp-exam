package com.project.exam.generator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/generator")
public class CandidateGeneratorController {

    private final CandidateGeneratorService generatorService;

    public CandidateGeneratorController(CandidateGeneratorService generatorService) {
        this.generatorService = generatorService;
    }

    @PostMapping("/start")
    public ResponseEntity<String> start() {
        generatorService.startGeneration();
        return ResponseEntity.ok("Generation started");
    }

    @PostMapping("/stop")
    public ResponseEntity<String> stop() {
        generatorService.stopGeneration();
        return ResponseEntity.ok("Generation stopped");
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> status() {
        return ResponseEntity.ok(generatorService.isGenerating());
    }
}
