// PdfRepository.java

package com.vlad.geometry.projectSpringBoot.repository;

import com.vlad.geometry.projectSpringBoot.model.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdfRepository extends JpaRepository<Pdf, Long> {
    // Additional custom query methods can be added here if needed
}