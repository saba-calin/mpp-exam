package com.project.exam.candidate;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/candidate")
@AllArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping
    public Candidate getCandidate(@RequestParam("id") int id) {
        return this.candidateService.getCandidateById(id);
    }

    @GetMapping("/get-all")
    public List<Candidate> getAllCandidates() {
        return this.candidateService.getAllCandidates();
    }
}
