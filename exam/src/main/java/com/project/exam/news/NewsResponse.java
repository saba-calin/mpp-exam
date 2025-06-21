package com.project.exam.news;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NewsResponse {

    private String title;
    private String content;
}
