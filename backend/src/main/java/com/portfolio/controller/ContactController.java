package com.portfolio.controller;

import com.portfolio.ContactRequest;
import com.portfolio.Repository.ContactRepository;
import com.portfolio.model.ContactMessage;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactRepository repository;

    public ContactController(ContactRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void send(@Valid @RequestBody ContactRequest request) {
        repository.save(new ContactMessage(request.name(), request.email(), request.message()));
    }
}