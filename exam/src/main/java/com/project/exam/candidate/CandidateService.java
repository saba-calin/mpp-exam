package com.project.exam.candidate;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public Candidate getCandidateById(int id) {
        return this.candidateRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }

    public List<Candidate> getAllCandidates() {
        return this.candidateRepository.findAll();
    }
}
