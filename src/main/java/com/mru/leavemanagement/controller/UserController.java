package com.mru.leavemanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mru.leavemanagement.dto.LoginRequest;
import com.mru.leavemanagement.dto.LoginResponse;
import com.mru.leavemanagement.dto.RegisterRequest;
import com.mru.leavemanagement.dto.ResetPasswordRequest;
import com.mru.leavemanagement.service.UserService;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return userService.login(
                request.getUsername(),
                request.getPassword(),
                request.getRole()
        );
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        userService.register(request);

        return "Registration Successful";
    }

    @GetMapping("/")
    public String home() {
        return "Student Leave Management System Backend is Running!";
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String username) {

        boolean success = userService.sendOtp(username);

        if (success) {
            return ResponseEntity.ok("OTP Sent Successfully");
        }

        return ResponseEntity.badRequest().body("User Not Found");
    }

    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {

        boolean success = userService.resetPasswordWithOtp(
                request.getUsername(),
                request.getRole(),
                request.getOtp(),
                request.getNewPassword());

        if (success) {
            return ResponseEntity.ok("Password Updated Successfully");
        }

        return ResponseEntity.badRequest().body("Invalid OTP or User Not Found");
    }
}