import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';

const AddAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:8080/student/addSecondAssignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
        }),
      });
    
      if (response.ok) {
        setMessage('Assignment added successfully!');
      } else {
        setMessage('Failed to add assignment.');
      }
    } catch (error) {
      setMessage('Error adding assignment.');
      console.error('Error adding assignment:', error);
    } 
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
    
      
      <Button variant="contained" color="primary" onClick={handleUpload}>Add Assignment</Button>
      <p>{message}</p>
    </Container>
  );
};

export default AddAssignment;
