package com.project.exam.candidate;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping
    public void deleteCandidate(@RequestParam("id") int id) {
        this.candidateService.deleteCandidateById(id);
    }

    @PostMapping
    public void addCandidate(@RequestParam("firstName") String firstName,
                             @RequestParam("lastName") String lastName,
                             @RequestParam("party") String party,
                             @RequestParam("photo") MultipartFile photo) {
        this.candidateService.addCandidate(firstName, lastName, party, photo);
    }

    @GetMapping("/test")
    public String test() {
        return "sup";
    }
}
