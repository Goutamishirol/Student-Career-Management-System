package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Certificate;
import com.example.demo.repository.CertificateRepository;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    // CREATE
    @PostMapping
    public Certificate addCertificate(@RequestBody Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    // READ
    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Certificate updateCertificate(
            @PathVariable Long id,
            @RequestBody Certificate updated) {

        Certificate certificate = certificateRepository
                .findById(id)
                .orElseThrow();

        certificate.setCertificateName(updated.getCertificateName());
        certificate.setPlatform(updated.getPlatform());
        certificate.setIssueDate(updated.getIssueDate());
        certificate.setCertificateLink(updated.getCertificateLink());

        return certificateRepository.save(certificate);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCertificate(@PathVariable Long id) {

        certificateRepository.deleteById(id);

        return "Certificate deleted";
    }
}