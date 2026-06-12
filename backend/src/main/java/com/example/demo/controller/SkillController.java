package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Skill;
import com.example.demo.repository.SkillRepository;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    // CREATE
    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    // READ
    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Skill updateSkill(
            @PathVariable Long id,
            @RequestBody Skill updated) {

        Skill skill = skillRepository
                .findById(id)
                .orElseThrow();

        skill.setSkillName(updated.getSkillName());
        skill.setProficiency(updated.getProficiency());

        return skillRepository.save(skill);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteSkill(@PathVariable Long id) {

        skillRepository.deleteById(id);

        return "Skill deleted";
    }
}