package com.project.exam.candidate;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public void deleteCandidateById(int id) {
        this.candidateRepository.deleteById(id);
    }

    public void addCandidate(String firstName, String lastName, String party, MultipartFile photo) {
        try {
            Candidate candidate = Candidate.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .party(party)
                    .photo(photo.getBytes())
                    .build();

            candidateRepository.save(candidate);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process photo", e);
        }
    }
}
