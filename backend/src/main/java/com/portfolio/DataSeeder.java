package com.portfolio;

import com.portfolio.Repository.ProjectRepository;
import com.portfolio.model.Project;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository repository;

    public DataSeeder(ProjectRepository repository) {
        this.repository = repository;
    }

    private void upsert(String title, String titleEn, String category, String categoryEn,
                        String description, String descriptionEn,
                        List<String> highlights, List<String> highlightsEn,
                        String stack, String github, String demo) {
        Project p = repository.findByTitle(title).orElseGet(Project::new);
        p.update(title, titleEn, category, categoryEn, description, descriptionEn,
                highlights, highlightsEn, stack, github, demo);
        repository.save(p);
    }

    @Override
    public void run(String... args) {
        upsert(
                "Plateforme BNPL", "BNPL Platform",
                "Fintech · Stage S2M · 2026", "Fintech · S2M internship · 2026",
                "Le BNPL (Buy Now, Pay Later) permet à un client de régler un achat en plusieurs échéances. "
                        + "Pendant mon stage chez S2M, j’ai participé au développement d’une plateforme de paiement fractionné : "
                        + "API backend en Java 21 / Spring Boot, interface en Vue.js et données stockées dans PostgreSQL. "
                        + "Le projet intègre aussi l’extraction de données KYC (vérification d’identité des clients) "
                        + "avec un modèle LLaMA exécuté en local via Ollama.",
                "BNPL (Buy Now, Pay Later) lets a customer pay for a purchase in several instalments. "
                        + "During my internship at S2M, I helped build an instalment payment platform: "
                        + "a Java 21 / Spring Boot backend API, a Vue.js interface and data stored in PostgreSQL. "
                        + "The project also includes KYC data extraction (customer identity verification) "
                        + "using a LLaMA model run locally through Ollama.",
                List.of(
                        "Backend Java 21 / Spring Boot exposant des API REST",
                        "Interface Vue.js connectée à l’API",
                        "Extraction de données KYC avec Ollama / LLaMA",
                        "Application conteneurisée avec Docker, code versionné avec Git / GitHub / GitLab"),
                List.of(
                        "Java 21 / Spring Boot backend exposing REST APIs",
                        "Vue.js interface connected to the API",
                        "KYC data extraction with Ollama / LLaMA",
                        "Containerized with Docker, code versioned with Git / GitHub / GitLab"),
                "Java 21, Spring Boot, Vue.js, PostgreSQL, Ollama, Docker, GitLab",
                null, null);

        upsert(
                "Gestion des actions de charité", "Charity Actions Management",
                "Application web · Projet académique", "Web application · Academic project",
                "Plateforme web de gestion des organisations caritatives et de leurs campagnes de collecte de dons. "
                        + "Architecture Spring Boot avec pages rendues côté serveur (Thymeleaf), sécurisation avec "
                        + "Spring Security et persistance dans PostgreSQL.",
                "Web platform to manage charitable organizations and their fundraising campaigns. "
                        + "Spring Boot architecture with server-side rendered pages (Thymeleaf), secured with "
                        + "Spring Security and persisted in PostgreSQL.",
                List.of(
                        "Gestion des organisations et des campagnes de collecte",
                        "Sécurisation de l’application avec Spring Security",
                        "Pages dynamiques rendues côté serveur avec Thymeleaf",
                        "Données persistées dans PostgreSQL"),
                List.of(
                        "Management of organizations and fundraising campaigns",
                        "Application secured with Spring Security",
                        "Dynamic pages rendered server-side with Thymeleaf",
                        "Data persisted in PostgreSQL"),
                "Spring Boot, Spring Security, PostgreSQL, Thymeleaf",
                "https://github.com/LI-ISSAM/gestion_charity", null);

        upsert(
                "Location de voitures", "Car Rental",
                "Application mobile · Projet académique", "Mobile application · Academic project",
                "Application mobile de gestion d’une agence de location : clients, véhicules et locations. "
                        + "Développée avec React Native, avec Supabase comme backend pour les données.",
                "Mobile app to manage a rental agency: customers, vehicles and rentals. "
                        + "Built with React Native, with Supabase as the data backend.",
                List.of(
                        "Gestion des clients",
                        "Gestion du parc de véhicules",
                        "Suivi des locations",
                        "Application mobile multiplateforme avec React Native"),
                List.of(
                        "Customer management",
                        "Vehicle fleet management",
                        "Rental tracking",
                        "Cross-platform mobile app with React Native"),
                "React Native, Supabase, JavaScript",
                "https://github.com/LI-ISSAM/Gestion-Location-Voitures", null);


    }
}