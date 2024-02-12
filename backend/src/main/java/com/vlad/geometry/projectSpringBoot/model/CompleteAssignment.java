package com.vlad.geometry.projectSpringBoot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "complete_assignment")
public class CompleteAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] content;

    
    
    private String studentName; // New attribute to store the student's name

    @ManyToOne
    @JoinColumn(name = "number" , referencedColumnName = "id")
    private SecondAssignment secondAssignment;
    // Constructors, getters, setters, and other methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    
    public SecondAssignment getSecondAssignment() {
        return secondAssignment;
    }

    public void setSecondAssignment(SecondAssignment secondAssignment) {
        this.secondAssignment = secondAssignment;
    }

    // Additional methods or annotations as needed

    @Override
    public String toString() {
        return "CompleteAssignment{" +
                "id=" + id +
                ", fileName='" + fileName + '\'' +
                ", studentName='" + studentName + '\'' +
                '}';
    }
}
