package com.vlad.geometry.projectSpringBoot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vlad.geometry.projectSpringBoot.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Your custom query methods (if any) can be declared here
	
	
	Optional<Student> findByUsername(String studentUsername);
}
