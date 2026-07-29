package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.User;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController  {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
public String registerUser(@RequestBody User user) {

    User existingUser = userRepository.findByEmail(user.getEmail());

    if (existingUser != null) {
        return "Email already registered";
    }

    userRepository.save(user);

    return "Registration successful";
}
// @PostMapping("/signin")
// public String loginUser(@RequestBody LoginRequest request) {

//     try {

//         System.out.println("SIGNIN HIT");
//         System.out.println("EMAIL = " + request.getEmail());

//         User user = userRepository.findByEmail(request.getEmail());

//         System.out.println("USER = " + user);

//         if (user == null) {
//             return "User not found";
//         }

//         if (!user.getPassword().equals(request.getPassword())) {
//             return "Invalid password";
//         }

//         return "Login successful";
@PostMapping("/signin")
public LoginResponse loginUser(@RequestBody LoginRequest request) {

    try {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return new LoginResponse(
                    false,
                    "User not found",
                    null,
                    null,
                    null
            );
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(
                    false,
                    "Invalid password",
                    null,
                    null,
                    null
            );
        }

        return new LoginResponse(
                true,
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    } catch (Exception e) {
        e.printStackTrace();
        return new LoginResponse(
                false,
                "ERROR = " + e.getClass().getName() + " : " + e.getMessage(),
                null,
                null,
                null
        );
    }
}
    // Get All Users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Test Endpoint
    @GetMapping("/test")
    public String test() {
        return "Controller working";
    }

    // Debug Endpoint
    @GetMapping("/debug")
    public String debug() {
        return "DEBUG-12345";
    }
}