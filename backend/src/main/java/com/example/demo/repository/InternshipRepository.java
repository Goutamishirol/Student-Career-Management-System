package com.example.demo.repository;

import com.example.demo.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    // Get all internships of a particular user
    List<Internship> findByUserId(Long userId);

}