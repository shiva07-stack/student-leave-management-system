package com.mru.leavemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mru.leavemanagement.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsernameAndPasswordAndRole(String username, String password, String role);
    boolean existsByUsername(String username);
    User findByUsername(String username);
    User findByUsernameAndRole(String username, String role);
    

}