package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vlad.geometry.projectSpringBoot.model.CompleteAssignment;
import com.vlad.geometry.projectSpringBoot.repository.CompleteAssignmentRepository;

@Service
public class CompleteAssignmentServiceImpl implements CompleteAssignmentService {

	private final CompleteAssignmentRepository completeAssignmentRepository;

    @Autowired
    public CompleteAssignmentServiceImpl(CompleteAssignmentRepository completeAssignmentRepository) {
        this.completeAssignmentRepository = completeAssignmentRepository;
    }

    @Override
    public void uploadCompletedAssignment(CompleteAssignment completedAssignment) {
        completeAssignmentRepository.save(completedAssignment);
    }

    @Override
    public List<CompleteAssignment> getAllCompletedAssignmentsForStudent(String studentName) {
        return completeAssignmentRepository.findByStudentName(studentName);
    }
    
    @Override
    public CompleteAssignment getCompletedAssignmentByIdAndStudentName(Long id, String studentName) {
        return completeAssignmentRepository.findByIdAndStudentName(id, studentName);
    }
    
    

    

   
}
