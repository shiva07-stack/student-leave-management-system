package com.mru.leavemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mru.leavemanagement.entity.Leave;
import com.mru.leavemanagement.service.LeaveService;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // Student applies leave
    @PostMapping("/apply")
    public Leave applyLeave(@RequestBody Leave leave) {
        return leaveService.applyLeave(leave);
    }

    // Student views own leaves
    @GetMapping("/student/{studentId}")
    public List<Leave> getStudentLeaves(@PathVariable Integer studentId) {
        return leaveService.getStudentLeaves(studentId);
    }

    // Parent views pending leaves
    @GetMapping("/pending")
    public List<Leave> getPendingLeaves() {
        return leaveService.getPendingLeaves();
    }
    @GetMapping("/parent-approved")
    public List<Leave> getParentApprovedLeaves() {
        return leaveService.getParentApprovedLeaves();
    }
    // Parent approves
    @PutMapping("/approve/{id}")
    public Leave approveLeave(@PathVariable Integer id) {
        return leaveService.approveLeave(id);
    }

    // Parent rejects
    @PutMapping("/reject/{id}")
    public Leave rejectLeave(@PathVariable Integer id) {
        return leaveService.rejectLeave(id);
    }

    // HOD approves
    @PutMapping("/hod/approve/{id}")
    public Leave hodApprove(@PathVariable Integer id) {
        return leaveService.hodApprove(id);
    }

    // HOD rejects
    @PutMapping("/hod/reject/{id}")
    public Leave hodReject(@PathVariable Integer id) {
        return leaveService.hodReject(id);
    }
}