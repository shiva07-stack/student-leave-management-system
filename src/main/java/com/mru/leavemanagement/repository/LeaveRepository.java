package com.mru.leavemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mru.leavemanagement.entity.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Integer> {

    List<Leave> findByStudentId(Integer studentId);
    List<Leave> findByStatus(String status);
}