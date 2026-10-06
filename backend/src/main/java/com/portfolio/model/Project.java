package com.portfolio.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String titleEn;
    private String category;
    private String categoryEn;

    @Column(length = 2000)
    private String description;
    @Column(length = 2000)
    private String descriptionEn;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(length = 500)
    private List<String> highlights = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(length = 500)
    private List<String> highlightsEn = new ArrayList<>();

    private String stack;
    private String githubUrl;
    private String demoUrl;
    private String image;

    public Project() {}

    /** Met à jour les textes. L'image n'est volontairement pas touchée. */
    public void update(String title, String titleEn, String category, String categoryEn,
                       String description, String descriptionEn,
                       List<String> highlights, List<String> highlightsEn,
                       String stack, String githubUrl, String demoUrl) {
        this.title = title;
        this.titleEn = titleEn;
        this.category = category;
        this.categoryEn = categoryEn;
        this.description = description;
        this.descriptionEn = descriptionEn;
        this.highlights = new ArrayList<>(highlights);
        this.highlightsEn = new ArrayList<>(highlightsEn);
        this.stack = stack;
        this.githubUrl = githubUrl;
        this.demoUrl = demoUrl;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getTitleEn() { return titleEn; }
    public String getCategory() { return category; }
    public String getCategoryEn() { return categoryEn; }
    public String getDescription() { return description; }
    public String getDescriptionEn() { return descriptionEn; }
    public List<String> getHighlights() { return highlights; }
    public List<String> getHighlightsEn() { return highlightsEn; }
    public String getStack() { return stack; }
    public String getGithubUrl() { return githubUrl; }
    public String getDemoUrl() { return demoUrl; }
    public String getImage() { return image; }
}