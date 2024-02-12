package com.vlad.geometry.projectSpringBoot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vlad.geometry.projectSpringBoot.model.SecondAssignment;
import com.vlad.geometry.projectSpringBoot.repository.SecondAssignmentRepository;
import java.util.List;

@Service
public class SecondAssignmentService {

    @Autowired
    private SecondAssignmentRepository secondAssignmentRepository;

    public List<SecondAssignment> getAllSecondAssignments() {
        return secondAssignmentRepository.findAll();
    }

    public void saveSecondAssignment(SecondAssignment secondAssignment) {
        secondAssignmentRepository.save(secondAssignment);
    }
    
    public String getAssignmentDescriptionContent(int assignmentId) {
        SecondAssignment assignment = secondAssignmentRepository.findById(assignmentId);
        if (assignment != null) {
        	return  assignment.getDescription();
        } else {
            return "Assignment not found!";
        }
    }
    public SecondAssignment findById(int id) {
        return secondAssignmentRepository.findById(id);
    }

    // Implement other methods as needed
}
