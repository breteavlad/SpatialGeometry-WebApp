package com.vlad.geometry.projectSpringBoot.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.sql.ast.tree.update.Assignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vlad.geometry.projectSpringBoot.model.Assignments;
import com.vlad.geometry.projectSpringBoot.model.Student;
import com.vlad.geometry.projectSpringBoot.repository.AssignmentRepository;
import com.vlad.geometry.projectSpringBoot.repository.StudentRepository;

@Service
public  class AssignmentServiceImpl implements AssignmentService{
	
	@Autowired
	private AssignmentRepository assignmentRepository;
	@Autowired
	private StudentRepository studentRepository;


	public List<Assignments> getAllAssignmentsForStudent(String studentUsername) {
		System.out.println("This is the student: " + studentRepository.findByUsername(studentUsername.trim()).toString());
	    String sU2=studentUsername.trim();
	    System.out.println("sU2:" + sU2);
		Optional<Student> optionalStudent = studentRepository.findByUsername(studentUsername);
	    System.out.println(optionalStudent.toString());
	    System.out.println(studentUsername);
	    if (optionalStudent.isPresent()) {
	    	System.out.println("if");
	        Student student = optionalStudent.get();
	        return assignmentRepository.findByStudentId(student.getId());
	    } else {
	    	System.out.println("else");
	        return Collections.emptyList();
	    }
	}

	@Override
	public Assignments saveAssignment(Assignments assignment) {
		// TODO Auto-generated method stub
		return assignmentRepository.save(assignment);
	}
    @Override
    public List<Assignments> getAllAssignments() {
        return assignmentRepository.findAll();
    }
	

	
}
