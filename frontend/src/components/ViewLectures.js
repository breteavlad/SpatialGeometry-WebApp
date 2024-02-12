import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function ViewLectures() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrls, setPdfUrls] = useState([]);

 

  useEffect(() => {
    const fetchPdf = async (fileName) => {
      try {
        const response = await fetch(`http://localhost:8080/student/getPdf?fileName=${fileName}`);
        const pdfBlob = await response.blob();
        return { url: URL.createObjectURL(pdfBlob), fileName };
      } catch (error) {
        console.error(`Error fetching PDF content for ${fileName}:`, error);
        return null;
      }
    };
  
    const fetchAllPdfs = async () => {
      try {
        const response = await fetch('http://localhost:8080/student/getAllPdfNames');
        const pdfFileNames = await response.json();
        const pdfs = await Promise.all(pdfFileNames.map(fetchPdf));
        setPdfUrls(pdfs.filter((pdf) => pdf !== null));
      } catch (error) {
        console.error('Error fetching PDF file names:', error);
      }
    };
  
    fetchAllPdfs();
  }, []);
  // Use the worker from the unpkg CDN
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h2>View Lectures</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2em' }}>
        {pdfUrls.map((pdf, index) => (
          <div key={index}>
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '4px',
                textAlign: 'center',
                margin: '10px 0'
              }}
            >
              View PDF "{pdf.fileName}"
            </a>
          </div>
        ))}
      </div>
    </div>
  );

}

export default ViewLectures;
