package com.vlad.geometry.projectSpringBoot.service;

import java.util.List;



import com.vlad.geometry.projectSpringBoot.model.Teacher;

public interface TeacherService {
	public Teacher saveTeacher(Teacher teacher);
	public List<Teacher> getAllTeachers();
}
