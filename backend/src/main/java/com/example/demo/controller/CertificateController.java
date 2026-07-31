package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.User;
import com.example.demo.model.Certificate;
import com.example.demo.repository.CertificateRepository;
import com.example.demo.repository.UserRepository;

@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "https://student-career-management-system.vercel.app"
    }
)
@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private static final long MAX_FILE_SIZE = 20L * 1024L * 1024L;
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("pdf", "jpg", "jpeg", "png");

    @Autowired
    private CertificateRepository repo;

    @Autowired
    private UserRepository userRepository;

    // CREATE using JSON payload for backward compatibility
    @PostMapping
    public Certificate add(
            @RequestParam Long userId,
            @RequestBody Certificate certificate) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        certificate.setUser(user);

        return repo.save(certificate);
    }

    // CREATE with file upload
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Certificate upload(
            @RequestParam Long userId,
            @RequestParam String certificateName,
            @RequestParam String issuer,
            @RequestParam String issueDate,
            @RequestParam("file") MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Certificate file is required");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Certificate certificate = new Certificate();
        certificate.setCertificateName(certificateName);
        certificate.setIssuer(issuer);
        certificate.setIssueDate(issueDate);
        certificate.setFileName(storeFile(file));
        certificate.setUser(user);

        return repo.save(certificate);
    }

    // UPDATE certificate with optional file replacement
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Certificate updateCertificate(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestParam String certificateName,
            @RequestParam String issuer,
            @RequestParam String issueDate,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Certificate certificate = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        if (!certificate.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to edit this certificate");
        }

        certificate.setCertificateName(certificateName);
        certificate.setIssuer(issuer);
        certificate.setIssueDate(issueDate);

        if (file != null && !file.isEmpty()) {
            deleteFile(certificate.getFileName());
            certificate.setFileName(storeFile(file));
        }

        return repo.save(certificate);
    }

    // READ
    @GetMapping
    public List<Certificate> getAll(@RequestParam Long userId) {

        return repo.findByUserId(userId);
    }

    // DELETE
    @DeleteMapping("/{id:[0-9]+}")
    public String delete(
            @PathVariable Long id,
            @RequestParam Long userId) {

        Certificate certificate = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        if (!certificate.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this certificate");
        }

        deleteFile(certificate.getFileName());
        repo.deleteById(id);

        return "Deleted";
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File size must be 20 MB or smaller");
        }

        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        if (originalFileName.contains("..")) {
            throw new RuntimeException("Invalid file name");
        }

        String extension = StringUtils.getFilenameExtension(originalFileName);

        if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new RuntimeException("Only PDF/JPG/JPEG/PNG files are allowed");
        }

        String generatedFileName = UUID.randomUUID().toString() + "." + extension.toLowerCase();
        Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadDir);

        Path targetLocation = uploadDir.resolve(generatedFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return generatedFileName;
    }

    private void deleteFile(String fileName) {
        if (fileName == null || fileName.isBlank()) {
            return;
        }

        try {
            Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
            Path filePath = uploadDir.resolve(fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException ignored) {
            // failure to delete should not block the main operation
        }
    }
}