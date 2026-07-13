package com.mru.leavemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mru.leavemanagement.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Student findByStudentUserId(Integer studentUserId);
	Student findByParentUserId(Integer parentUserId);

}