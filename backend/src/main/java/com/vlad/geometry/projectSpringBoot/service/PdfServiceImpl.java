package com.vlad.geometry.projectSpringBoot.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vlad.geometry.projectSpringBoot.model.Pdf;
import com.vlad.geometry.projectSpringBoot.repository.PdfRepository;

@Service
public class PdfServiceImpl implements PdfService {

    private static final String PDF_STORAGE_PATH = "C:\\Users\\brete\\Desktop\\javaProject\\geometryfrontend\\src\\components\\Docs"; // Change this to your desired storage path
    @Autowired
    private PdfRepository pdfRepository;
    
    
    @Override
    public byte[] getPdfContent(String fileName) throws IOException {
        // Read the PDF content from the file system
        Path pdfPath = Path.of(PDF_STORAGE_PATH, fileName );
        return Files.readAllBytes(pdfPath);
    }

    @Override
    public void savePdfContent(MultipartFile file) throws IOException {
    	 try {
             Pdf pdf = new Pdf();
             pdf.setFileName(file.getOriginalFilename());
             pdf.setContent(file.getBytes());
             pdfRepository.save(pdf);
         } catch (Exception e) {
             // Handle the exception appropriately
             throw new RuntimeException("Failed to save PDF", e);
         }
    }
    
    @Override
    public List<String> getAllPdfNames() {
        List<Pdf> allPdfFiles = pdfRepository.findAll(); // Retrieve all PDF files from the database
        return allPdfFiles.stream()
                          .map(Pdf::getFileName) // Extract file names
                          .collect(Collectors.toList()); // Collect file names into a list
    }
}
