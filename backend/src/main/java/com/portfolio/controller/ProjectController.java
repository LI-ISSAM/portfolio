package com.portfolio.controller;


import com.portfolio.Repository.ProjectRepository;
import com.portfolio.dto.ProjectDto;
import com.portfolio.model.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/projects")
public class ProjectController {
    private final ProjectRepository pr;
    public ProjectController(ProjectRepository pr){
        this.pr = pr;
    }

    @GetMapping
    public List<ProjectDto> getAll(@RequestParam(defaultValue = "fr") String lang) {
        boolean en = "en".equalsIgnoreCase(lang);
        return pr.findAllByOrderByIdAsc().stream()
                .map(p -> ProjectDto.of(p, en))
                .toList();
    }
}
