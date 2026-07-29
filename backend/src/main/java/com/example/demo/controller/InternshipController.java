package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.User;
import com.example.demo.model.Internship;
import com.example.demo.repository.InternshipRepository;
import com.example.demo.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    private InternshipRepository repo;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    @PostMapping
    public Internship add(
            @RequestParam Long userId,
            @RequestBody Internship internship) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        internship.setUser(user);

        return repo.save(internship);
    }

    // READ
    @GetMapping
    public List<Internship> getAll(@RequestParam Long userId) {

        return repo.findByUserId(userId);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id,
            @RequestParam Long userId) {

        Internship internship = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        if (!internship.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this internship");
        }

        repo.deleteById(id);

        return "Deleted";
    }

    // UPDATE
    @PutMapping("/{id}")
    public Internship update(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Internship updated) {

        Internship internship = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        if (!internship.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to edit this internship");
        }

        internship.setCompany(updated.getCompany());
        internship.setRole(updated.getRole());
        internship.setDuration(updated.getDuration());
        internship.setStatus(updated.getStatus());

        return repo.save(internship);
    }

    // COUNT
    @GetMapping("/count")
    public long count(@RequestParam Long userId) {

        return repo.findByUserId(userId).size();
    }

}