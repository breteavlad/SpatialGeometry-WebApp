package com.vlad.geometry.projectSpringBoot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vlad.geometry.projectSpringBoot.model.Assignments;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignments, Integer>{
	List<Assignments> findByStudentId(int studentId);
}
