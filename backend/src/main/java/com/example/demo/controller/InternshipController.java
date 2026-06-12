package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Internship;
import com.example.demo.repository.InternshipRepository;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    private InternshipRepository internshipRepository;

    @PostMapping
    public Internship addInternship(@RequestBody Internship internship) {
        return internshipRepository.save(internship);
    }

    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteInternship(@PathVariable Long id) {
        internshipRepository.deleteById(id);
        return "Internship deleted";
    }

    @PutMapping("/{id}")
    public Internship updateInternship(
            @PathVariable Long id,
            @RequestBody Internship updated) {

        Internship internship = internshipRepository
                .findById(id)
                .orElseThrow();

        internship.setCompanyName(updated.getCompanyName());
        internship.setRole(updated.getRole());
        internship.setStatus(updated.getStatus());
        internship.setLink(updated.getLink());
        internship.setNotes(updated.getNotes());

        return internshipRepository.save(internship);
    }
}