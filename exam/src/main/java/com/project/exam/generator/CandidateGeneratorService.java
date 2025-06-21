package com.project.exam.generator;

import com.project.exam.candidate.Candidate;
import com.project.exam.candidate.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CandidateGeneratorService {
    private final AtomicBoolean generating = new AtomicBoolean(false);
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final CandidateRepository candidateRepository; // Or your own service

    public CandidateGeneratorService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public void startGeneration() {
        if (generating.compareAndSet(false, true)) {
            executor.submit(() -> {
                while (generating.get()) {
                    Candidate candidate = generateRandomCandidate();
                    candidateRepository.save(candidate); // Save to DB
                    try {
                        Thread.sleep(1000); // 1 second delay
                    } catch (InterruptedException ignored) {}
                }
            });
        }
    }

    public void stopGeneration() {
        generating.set(false);
    }

    public boolean isGenerating() {
        return generating.get();
    }

    private Candidate generateRandomCandidate() {
        String[] firstNames = {"Liam", "Olivia", "Noah", "Emma"};
        String[] lastNames = {"Brown", "Jones", "Garcia", "Miller"};
        String[] parties = {"Red", "Blue", "Green", "Yellow"};

        return new Candidate(
                null,
                firstNames[new Random().nextInt(firstNames.length)],
                lastNames[new Random().nextInt(lastNames.length)],
                parties[new Random().nextInt(parties.length)],
                0,
                false,
                null // handle photo if needed
        );
    }
}

