package com.portfolio.Repository;

import com.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findAllByOrderByIdAsc();
    Optional<Project> findByTitle(String title);
}