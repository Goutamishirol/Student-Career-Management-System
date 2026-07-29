package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.User;
import com.example.demo.model.Skill;
import com.example.demo.repository.SkillRepository;
import com.example.demo.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    @PostMapping
    public Skill addSkill(
            @RequestParam Long userId,
            @RequestBody Skill skill) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        skill.setUser(user);

        return skillRepository.save(skill);
    }

    // READ
    @GetMapping
    public List<Skill> getAllSkills(@RequestParam Long userId) {

        return skillRepository.findByUserId(userId);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Skill updateSkill(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Skill updated) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to edit this skill");
        }

        skill.setSkillName(updated.getSkillName());
        skill.setProficiency(updated.getProficiency());

        return skillRepository.save(skill);
    }

    @GetMapping("/{id}")
    public Skill getSkill(@PathVariable Long id) {
        return skillRepository.findById(id).orElseThrow();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteSkill(
            @PathVariable Long id,
            @RequestParam Long userId) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this skill");
        }

        skillRepository.deleteById(id);

        return "Skill deleted";
    }
}