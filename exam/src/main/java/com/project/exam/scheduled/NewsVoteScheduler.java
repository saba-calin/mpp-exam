package com.project.exam.scheduled;

import com.project.exam.candidate.Candidate;
import com.project.exam.candidate.CandidateRepository;
import com.project.exam.news.News;
import com.project.exam.news.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsVoteScheduler {

    private final NewsRepository newsRepository;
    private final CandidateRepository candidateRepository;

    @Scheduled(fixedRate = 5000)
    public void voteBasedOnFavourableNews() {
        List<News> allNews = newsRepository.findAll();

        if (allNews.isEmpty()) return;

        // Count favourable news per candidateId
        Map<Integer, Long> favCount = allNews.stream()
                .filter(News::isFavourable)
                .collect(Collectors.groupingBy(News::getCandidateId, Collectors.counting()));

        if (favCount.isEmpty()) return;

        // Find the candidateId with the most favourable news
        Optional<Map.Entry<Integer, Long>> maxEntry = favCount.entrySet().stream()
                .max(Map.Entry.comparingByValue());

        if (maxEntry.isPresent()) {
            Integer topCandidateId = maxEntry.get().getKey();

            Optional<Candidate> candidateOpt = candidateRepository.findById(topCandidateId);
            if (candidateOpt.isPresent()) {
                Candidate candidate = candidateOpt.get();
                candidate.setVotes(candidate.getVotes() + 1);
                candidateRepository.save(candidate);

                System.out.println("Gave 1 vote to candidate: " +
                        candidate.getFirstName() + " " + candidate.getLastName() +
                        " (Total votes: " + candidate.getVotes() + ")");
            }
        }
    }
}
