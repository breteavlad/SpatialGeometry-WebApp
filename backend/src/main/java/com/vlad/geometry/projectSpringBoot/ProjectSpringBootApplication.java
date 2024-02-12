package com.vlad.geometry.projectSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.vlad.geometry.projectSpringBoot.model"})
@ComponentScan({"com.vlad.geometry.projectSpringBoot.service","com.vlad.geometry.projectSpringBoot.repository","com.vlad.geometry.projectSpringBoot.controller"})


public class ProjectSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectSpringBootApplication.class, args);
		System.out.println("Hi");
	}

}
