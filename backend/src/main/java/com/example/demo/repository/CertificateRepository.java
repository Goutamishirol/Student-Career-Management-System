package com.example.demo.repository;

import com.example.demo.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    // Get all certificates of a particular user
    List<Certificate> findByUserId(Long userId);

}