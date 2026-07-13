package com.mru.leavemanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Random;
import com.mru.leavemanagement.dto.LoginResponse;
import com.mru.leavemanagement.dto.RegisterRequest;
import com.mru.leavemanagement.entity.Student;
import com.mru.leavemanagement.entity.User;
import com.mru.leavemanagement.repository.StudentRepository;
import com.mru.leavemanagement.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    public LoginResponse login(String username, String password, String role) {

        User user = userRepository.findByUsernameAndPasswordAndRole(username, password, role);

        LoginResponse response = new LoginResponse();

        if (user != null) {
            response.setSuccess(true);
            response.setMessage("Login Successful");
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            response.setRole(user.getRole());
            response.setName(user.getName());

            Student student = studentRepository.findByStudentUserId(user.getId());

            if (student != null) {
                response.setStudentId(student.getId());
            }

        } else {
            response.setSuccess(false);
            response.setMessage("Invalid Username or Password");
        }

        return response;
    }

    public void register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getStudentEmail())) {
            throw new RuntimeException("Student Email Already Exists");
        }

        if (userRepository.existsByUsername(request.getParentPhone())) {
            throw new RuntimeException("Parent Email Already Exists");
        }

        User student = new User();

        student.setName(request.getStudentName());
        student.setUsername(request.getStudentEmail());
        student.setPassword(request.getStudentPassword());
        student.setRole("student");

        student = userRepository.save(student);

        User parent = new User();

        parent.setName(request.getParentName());
        parent.setUsername(request.getParentPhone());
        parent.setPassword(request.getParentPassword());
        parent.setRole("parent");

        parent = userRepository.save(parent);

        Student studentDetails = new Student();

        studentDetails.setName(request.getStudentName());
        studentDetails.setRollNo(request.getRollNo());
        studentDetails.setBranch(request.getBranch());
        studentDetails.setYear(request.getYear());

        studentDetails.setStudentEmail(request.getStudentEmail());
        studentDetails.setParentPhone(request.getParentPhone());

        studentDetails.setStudentUserId(student.getId());
        studentDetails.setParentUserId(parent.getId());

        studentRepository.save(studentDetails);
    }
    public boolean resetPassword(String username, String role, String newPassword) {

        User user = userRepository.findByUsernameAndRole(username, role);

        if (user == null) {
            return false;
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return true;
    }
    public boolean sendOtp(String username) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return false;
        }

        String otp = otpService.generateOtp(username);

        emailService.sendOtp(username, otp);

        return true;
    }

    public boolean resetPasswordWithOtp(String username, String role, String otp, String newPassword) {

        if (!otpService.verifyOtp(username, otp)) {
            return false;
        }

        User user = userRepository.findByUsernameAndRole(username, role);

        if (user == null) {
            return false;
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        otpService.removeOtp(username);

        return true;
    }
}