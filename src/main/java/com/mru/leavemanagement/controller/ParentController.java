package com.mru.leavemanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mru.leavemanagement.entity.Student;
import com.mru.leavemanagement.repository.StudentRepository;

@RestController
@RequestMapping("/api/parent")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class ParentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/{parentUserId}")
    public Student getStudent(@PathVariable Integer parentUserId) {

        return studentRepository.findByParentUserId(parentUserId);

    }
}