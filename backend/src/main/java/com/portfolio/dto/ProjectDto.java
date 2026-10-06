package com.portfolio.dto;

import com.portfolio.model.Project;

import java.util.List;

public record ProjectDto(Long id, String title, String category, String description,
                         List<String> highlights, String stack,
                         String githubUrl, String demoUrl, String image) {

    public static ProjectDto of(Project p, boolean en) {
        return new ProjectDto(
                p.getId(),
                pick(en, p.getTitleEn(), p.getTitle()),
                pick(en, p.getCategoryEn(), p.getCategory()),
                pick(en, p.getDescriptionEn(), p.getDescription()),
                pick(en, p.getHighlightsEn(), p.getHighlights()),
                p.getStack(), p.getGithubUrl(), p.getDemoUrl(), p.getImage());
    }

    // Si la traduction est absente, on retombe sur le français
    private static String pick(boolean en, String english, String french) {
        return en && english != null && !english.isBlank() ? english : french;
    }

    private static List<String> pick(boolean en, List<String> english, List<String> french) {
        return List.copyOf(en && english != null && !english.isEmpty() ? english : french);
    }
}