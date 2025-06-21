package com.project.exam.election;

import com.project.exam.candidate.Candidate;
import com.project.exam.candidate.CandidateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ElectionService {

    private final CandidateRepository candidateRepository;

    public void generateVotes() {
        List<Candidate> candidates = this.candidateRepository.findAll();

        for (int i = 0 ; i < 5000; i++) {
            int randomIndex = (int) (Math.random() * candidates.size());
            Candidate candidate = candidates.get(randomIndex);
            candidate.setVotes(candidate.getVotes() + 1);
            this.candidateRepository.save(candidate);
        }
    }

    public List<Candidate> getResults() {
        return this.candidateRepository.findAll();
    }
}
