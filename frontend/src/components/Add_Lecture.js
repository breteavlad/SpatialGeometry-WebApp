import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';

const AddLecture = () => {
  const [file, setFile] = useState(null);
  const [lectureName, setLectureName] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('lectureName', lectureName);

      const response = await fetch('http://localhost:8080/student/uploadPdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Lecture added successfully!');
      } else {
        setMessage('Failed to add lecture.');
      }
    } catch (error) {
      setMessage('Error adding lecture.');
      console.error('Error adding lecture:', error);
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
      <TextField label="Lecture Name" value={lectureName} onChange={(e) => setLectureName(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>Add Lecture</Button>
      <p>{message}</p>
    </Container>
  );
};

export default AddLecture;