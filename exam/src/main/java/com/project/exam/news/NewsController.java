package com.project.exam.news;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/news")
@AllArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public NewsResponse generate() {
        return this.newsService.getNews();
    }
}
