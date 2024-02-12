package com.vlad.geometry.projectSpringBoot.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vlad.geometry.projectSpringBoot.model.Assignments;
import com.vlad.geometry.projectSpringBoot.model.CompleteAssignment;
import com.vlad.geometry.projectSpringBoot.model.SecondAssignment;
import com.vlad.geometry.projectSpringBoot.model.Student;
import com.vlad.geometry.projectSpringBoot.model.Teacher;
import com.vlad.geometry.projectSpringBoot.service.AssignmentService;
import com.vlad.geometry.projectSpringBoot.service.CompleteAssignmentService;
import com.vlad.geometry.projectSpringBoot.service.PdfService;
import com.vlad.geometry.projectSpringBoot.service.SecondAssignmentService;
import com.vlad.geometry.projectSpringBoot.service.StudentService;
import com.vlad.geometry.projectSpringBoot.service.TeacherService;





@RestController
@RequestMapping("/student")
//@CrossOrigin
@CrossOrigin(origins = "http://localhost:3000") 
public class Controller {
@Autowired
private StudentService studentService;
@Autowired
private TeacherService teacherService;
@Autowired
private AssignmentService assignmentService;
@Autowired
private PdfService pdfService;
@Autowired
private SecondAssignmentService secondAssignmentService;
@Autowired
private CompleteAssignmentService completeAssignmentService;


@GetMapping("/completedAssignments/{studentName}/content/{assignmentId}")
public ResponseEntity<byte[]> getAssignmentContent(@PathVariable String studentName, @PathVariable Long assignmentId) {
    try {
        CompleteAssignment assignment = completeAssignmentService.getCompletedAssignmentByIdAndStudentName(assignmentId, studentName);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] content = assignment.getContent();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", assignment.getFileName());
        headers.setContentLength(content.length);

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


@GetMapping("/completedAssignments/{studentName}")
public ResponseEntity<List<CompleteAssignment>> getCompletedAssignmentsForStudent(@PathVariable String studentName) {
    List<CompleteAssignment> assignments = completeAssignmentService.getAllCompletedAssignmentsForStudent(studentName);
    if (assignments.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }
}


@PostMapping("/addCompletedAssignment")
public ResponseEntity<String> addCompletedAssignment(@RequestParam("file") MultipartFile file,
                                                     @RequestParam("studentName") String studentName,
                                                     @RequestParam("assignmentTitle") String assignmentTitle,
                                                     @RequestParam("id") int id) {
    try {
        // Convert MultipartFile to byte array
        byte[] content = file.getBytes();

        // Retrieve the SecondAssignment object based on the provided number
        SecondAssignment secondAssignment = secondAssignmentService.findById(id);

        if (secondAssignment == null) {
            // Handle case where no SecondAssignment with the provided number is found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("SecondAssignment not found for id: " + id);
        }

        // Create a new CompleteAssignment object
        CompleteAssignment completeAssignment = new CompleteAssignment();
        completeAssignment.setStudentName(studentName);
        completeAssignment.setFileName(file.getOriginalFilename());
        completeAssignment.setContent(content);
        completeAssignment.setSecondAssignment(secondAssignment); // Set the SecondAssignment

        // Save the completed assignment
        completeAssignmentService.uploadCompletedAssignment(completeAssignment);

        return ResponseEntity.ok("Completed assignment added successfully!");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add completed assignment.");
    }
}


@GetMapping("/secondAssignments")
public List<SecondAssignment> getAllSecondAssignments() {
    return secondAssignmentService.getAllSecondAssignments();
}

@PostMapping("/addSecondAssignment")
public String addSecondAssignment(@RequestBody SecondAssignment secondAssignment) {
    secondAssignmentService.saveSecondAssignment(secondAssignment);
    return "New second assignment added!";
}

@GetMapping("/description")
public String getAssignmentDescriptionContent(@RequestParam int assignmentId) {
    return secondAssignmentService.getAssignmentDescriptionContent(assignmentId);
}

@GetMapping("/getPdf")
public ResponseEntity<Resource> getPdf(@RequestParam String fileName) throws IOException {
    // Retrieve the PDF file content using the PdfService
	
	
	
    byte[] pdfContent = pdfService.getPdfContent(fileName);

    // Create a ByteArrayResource from the byte array
    ByteArrayResource resource = new ByteArrayResource(pdfContent);

    // Set headers for the response
    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=document.pdf");

    // Return the ResponseEntity with the ByteArrayResource, headers, and content type
    return ResponseEntity.ok()
            .headers(headers)
            .contentLength(pdfContent.length)
            .contentType(MediaType.APPLICATION_PDF)
            .body(resource);
}

@PostMapping("/uploadPdf")
public ResponseEntity<String> uploadPdf(@RequestParam("file") MultipartFile file) {
    try {
        pdfService.savePdfContent(file);
        return ResponseEntity.ok("PDF uploaded successfully!");
    } catch (IOException e) {
        // Handle the exception more gracefully, returning an error message
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload PDF.");
    }
}


@GetMapping("/getAssignStudent")
public List<Assignments> getAllAssignments(@RequestParam String s){
	System.out.println("Received studentName: " + s);
	return assignmentService.getAllAssignmentsForStudent(s);
}

@PostMapping("/addAssignment")
public String addAssignment(@RequestBody Map<String, Object> request) {
    Object studentIdObject = request.get("student_id");
    Object assignmentIdObject = request.get("assignment_number");
    Object markObject = request.get("mark");

    // Check if the objects are not null and are of the correct type
    if (!(studentIdObject instanceof Integer) || !(assignmentIdObject instanceof Integer) || !(markObject instanceof Integer)) {
        return "Invalid input format. Expected integers for student_id, assignment_number, and mark.";
    }

    // Convert objects to integers
    int studentId = (Integer) studentIdObject;
    int assignmentId = (Integer) assignmentIdObject;
    int mark = (Integer) markObject;

    // Retrieve the student and second assignment objects based on the provided IDs
    Optional<Student> studentOptional = studentService.findById(studentId);
    SecondAssignment secondAssignment = secondAssignmentService.findById(assignmentId);
    
    // Check if student and second assignment exist
    if (studentOptional.isEmpty() || secondAssignment == null) {
        return "Failed to add assignment. Student or second assignment not found.";
    }

    // Get the student from the Optional
    Student student = studentOptional.get();

    // Create the assignment object
    Assignments assignment = new Assignments();
    assignment.setStudent(student);
    assignment.setSecondAssignment(secondAssignment);
    assignment.setMark(mark);

    // Save the assignment
    assignmentService.saveAssignment(assignment);
    return "New assignment added!";
}



@PostMapping("/add")
public String add(@RequestBody Student student) {
	studentService.saveStudent(student);
	return "New student is added";
}
@GetMapping("/getAll")
public List<Student> getAllStudents(){
	return studentService.getAllStudents();
}
@PostMapping("/addTeacher")
public String addTeacher(@RequestBody Teacher teacher) {
	teacherService.saveTeacher(teacher);
	return "New teacher is added";
}
@GetMapping("/getAllTeachers")
public List<Teacher> getAllTeachers(){
	return teacherService.getAllTeachers();
}
@GetMapping("/getAllPdfNames")
public List<String> getAllPdfNames() {
    return pdfService.getAllPdfNames();
}

}
