package com.vlad.geometry.projectSpringBoot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vlad.geometry.projectSpringBoot.model.CompleteAssignment;

@Repository
public interface CompleteAssignmentRepository extends JpaRepository<CompleteAssignment, Long> {
	List<CompleteAssignment> findByStudentName(String studentName);
	CompleteAssignment findByIdAndStudentName(Long id, String studentName);
}
