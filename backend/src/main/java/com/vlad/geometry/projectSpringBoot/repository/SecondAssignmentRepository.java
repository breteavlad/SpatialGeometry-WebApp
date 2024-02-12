package com.vlad.geometry.projectSpringBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vlad.geometry.projectSpringBoot.model.SecondAssignment;

@Repository
public interface SecondAssignmentRepository extends JpaRepository<SecondAssignment, Integer> {
    // Define custom query methods if needed
	SecondAssignment findById(int id); // Updated method name
}