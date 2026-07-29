package com.example.demo.repository;

import com.example.demo.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    // Get all skills of a particular user
    List<Skill> findByUserId(Long userId);

}