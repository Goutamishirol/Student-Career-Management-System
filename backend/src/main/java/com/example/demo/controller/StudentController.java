package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    StudentRepository repo;

    @PostMapping
    public Student add(@RequestBody Student s){
        return repo.save(s);
    }

    @GetMapping
    public List<Student> getAll(){
        return repo.findAll();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        repo.deleteById(id);
        return "Deleted";
    }

    @GetMapping("/count")
    public long count(){
        return repo.count();
    }

}