package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Internship;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

}