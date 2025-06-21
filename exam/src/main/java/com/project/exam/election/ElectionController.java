package com.project.exam.election;

import com.project.exam.candidate.Candidate;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/election")
@AllArgsConstructor
public class ElectionController {

    private final ElectionService electionService;

    @PostMapping("/start")
    public void startElection() {
        this.electionService.generateVotes();
    }

    @GetMapping("/results")
    public List<Candidate> viewResults() {
        return this.electionService.getResults();
    }
}
