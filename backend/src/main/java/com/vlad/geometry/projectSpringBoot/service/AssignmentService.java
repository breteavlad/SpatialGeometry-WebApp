package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;

import org.hibernate.sql.ast.tree.update.Assignment;

import com.vlad.geometry.projectSpringBoot.model.Assignments;
import com.vlad.geometry.projectSpringBoot.model.Student;

public interface AssignmentService {
	
	public Assignments saveAssignment( Assignments assignment);
	public List<Assignments> getAllAssignmentsForStudent(String studentName);
	public List<Assignments> getAllAssignments();
}
