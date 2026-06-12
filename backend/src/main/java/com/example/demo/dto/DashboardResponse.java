package com.example.demo.dto;

public class DashboardResponse {

    private long users;
    private long internships;
    private long certificates;
    private long skills;

    public DashboardResponse(long users, long internships, long certificates, long skills) {
        this.users = users;
        this.internships = internships;
        this.certificates = certificates;
        this.skills = skills;
    }

    public long getUsers() {
        return users;
    }

    public long getInternships() {
        return internships;
    }

    public long getCertificates() {
        return certificates;
    }

    public long getSkills() {
        return skills;
    }
}
