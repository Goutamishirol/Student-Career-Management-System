package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.DashboardResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.InternshipRepository;
import com.example.demo.repository.CertificateRepository;
import com.example.demo.repository.SkillRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/stats")
    public DashboardResponse getStats() {

        return new DashboardResponse(
                userRepository.count(),
                internshipRepository.count(),
                certificateRepository.count(),
                skillRepository.count()
        );
    }
}
