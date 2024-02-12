package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vlad.geometry.projectSpringBoot.model.Student;
import com.vlad.geometry.projectSpringBoot.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentRepository studentRepository;
	
	  public Student saveStudent(Student student) {
	        if (!isValidPassword(student.getPassword())) {
	            throw new IllegalArgumentException("Password must meet certain criteria.");
	        }
	        System.out.println("I have got here!");
	        return studentRepository.save(student);
	    }

	@Override
	public List<Student> getAllStudents() {
		// TODO Auto-generated method stub
		return studentRepository.findAll();
	}
	
	public Optional<Student> findByName(String studentName) {
        return studentRepository.findByUsername(studentName);
    }
	
	 @Override
	    public Optional<Student> findById(int studentId) {
	        return studentRepository.findById(studentId);
	    }
	 public boolean isValidPassword(String password) {
	        // Regex pattern for password validation
	        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";

	        // Compile the pattern
	        Pattern pattern = Pattern.compile(regex);

	        // Create matcher object
	        Matcher matcher = pattern.matcher(password);

	        // Return true if password matches the pattern, otherwise false
	        return matcher.matches();
	    }

	
}
