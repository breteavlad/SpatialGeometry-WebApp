package com.vlad.geometry.projectSpringBoot.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface PdfService {
    byte[] getPdfContent(String fileName) throws IOException;
    void savePdfContent(MultipartFile file) throws IOException;
	List<String> getAllPdfNames();

}
