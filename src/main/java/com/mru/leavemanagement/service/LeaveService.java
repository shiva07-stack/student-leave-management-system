package com.mru.leavemanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mru.leavemanagement.entity.Leave;
import com.mru.leavemanagement.repository.LeaveRepository;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    // Student applies leave
    public Leave applyLeave(Leave leave) {
        leave.setStatus("Pending");
        return leaveRepository.save(leave);
    }

    // Student views own leaves
    public List<Leave> getStudentLeaves(Integer studentId) {
        return leaveRepository.findByStudentId(studentId);
    }

    // Parent views pending leaves
    public List<Leave> getPendingLeaves() {
        return leaveRepository.findByStatus("Pending");
    }
    public List<Leave> getParentApprovedLeaves() {
        return leaveRepository.findByStatus("Parent Approved");
    }

    // Parent approves
    public Leave approveLeave(Integer id) {
        Leave leave = leaveRepository.findById(id).orElse(null);

        if (leave != null) {
            leave.setStatus("Parent Approved");
            return leaveRepository.save(leave);
        }

        return null;
    }

    // Parent rejects
    public Leave rejectLeave(Integer id) {
        Leave leave = leaveRepository.findById(id).orElse(null);

        if (leave != null) {
            leave.setStatus("Rejected");
            return leaveRepository.save(leave);
        }

        return null;
    }

    // HOD approves
    public Leave hodApprove(Integer id) {
        Leave leave = leaveRepository.findById(id).orElse(null);

        if (leave != null) {
            leave.setStatus("Approved");
            return leaveRepository.save(leave);
        }

        return null;
    }

    // HOD rejects
    public Leave hodReject(Integer id) {
        Leave leave = leaveRepository.findById(id).orElse(null);

        if (leave != null) {
            leave.setStatus("Rejected");
            return leaveRepository.save(leave);
        }

        return null;
    }
}