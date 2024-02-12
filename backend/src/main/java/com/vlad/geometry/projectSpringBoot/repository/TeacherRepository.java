package com.vlad.geometry.projectSpringBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vlad.geometry.projectSpringBoot.model.Teacher;
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer>{

}
