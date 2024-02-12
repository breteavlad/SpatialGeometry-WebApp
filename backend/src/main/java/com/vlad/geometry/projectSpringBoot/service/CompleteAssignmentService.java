package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;

import com.vlad.geometry.projectSpringBoot.model.CompleteAssignment;

public interface CompleteAssignmentService {

    
	
	void uploadCompletedAssignment(CompleteAssignment completedAssignment);
    List<CompleteAssignment> getAllCompletedAssignmentsForStudent(String studentName);
    CompleteAssignment getCompletedAssignmentByIdAndStudentName(Long id, String studentName);


    // Other methods if needed
}
