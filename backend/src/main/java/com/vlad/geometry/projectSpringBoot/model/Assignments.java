package com.vlad.geometry.projectSpringBoot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Assignments {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int assignmentmatch_id;
    
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "assignment_number")
    private SecondAssignment secondAssignment;
    
    private int mark;
	
    // Getters and setters
    
    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public int getAssignmentmatch_id() {
        return assignmentmatch_id;
    }

    public void setAssignmentmatch_id(int assignmentmatch_id) {
        this.assignmentmatch_id = assignmentmatch_id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public SecondAssignment getSecondAssignment() {
        return secondAssignment;
    }

    public void setSecondAssignment(SecondAssignment secondAssignment) {
        this.secondAssignment = secondAssignment;
    }
}
