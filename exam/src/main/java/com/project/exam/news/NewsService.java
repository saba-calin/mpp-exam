package com.project.exam.news;

import com.project.exam.candidate.Candidate;
import com.project.exam.candidate.CandidateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class NewsService {

    private final CandidateRepository candidateRepository;
    private final NewsRepository newsRepository;

    private final Random random = new Random();

    public NewsResponse getNews() {
        List<Candidate> candidates = candidateRepository.findAll();
        if (candidates.isEmpty()) {
            return new NewsResponse("No Candidates", "There are currently no candidates to generate news for.");
        }

        Candidate candidate = candidates.get(random.nextInt(candidates.size()));
        String name = candidate.getFirstName() + " " + candidate.getLastName();
        int candidateId = candidate.getId();

        if (candidate.isFavourable()) {
            String[] positiveNews = {
                    name + " gains momentum with a powerful speech at the rally.",
                    name + " praised for community outreach program.",
                    name + " secures major endorsement from local leaders."
            };
            // Optionally, save the news to the repository
            News news = News.builder()
                    .candidateId(candidateId)
                    .isFavourable(true)
                    .build();
            this.newsRepository.save(news);

            return new NewsResponse("Good News", positiveNews[random.nextInt(positiveNews.length)]);
        } else {
            String[] negativeNews = {
                    name + " criticized for poor performance in debate.",
                    name + " involved in controversy regarding campaign funding.",
                    name + " loses public support after recent interview blunder."
            };
            News news = News.builder()
                    .candidateId(candidateId)
                    .isFavourable(false)
                    .build();
            this.newsRepository.save(news);

            return new NewsResponse("Bad News", negativeNews[random.nextInt(negativeNews.length)]);
        }
    }
}
