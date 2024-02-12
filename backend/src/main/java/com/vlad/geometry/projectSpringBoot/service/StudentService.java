package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;
import java.util.Optional;

import com.vlad.geometry.projectSpringBoot.model.Student;


public interface StudentService {
public Student saveStudent(Student student);
public List<Student> getAllStudents();
public Optional<Student> findByName(String studentName);
public Optional<Student> findById(int studentId);
public boolean isValidPassword(String password);
}
