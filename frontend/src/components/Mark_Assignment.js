import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';

const MarkAssignment = () => {
  const [studentId, setStudentId] = useState('');
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [mark, setMark] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/student/addAssignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: parseInt(studentId), // Updated property name to student_id
          assignment_number: parseInt(assignmentNumber), // Updated property name to assignment_number
          mark: parseInt(mark),
        }),
      });

      if (response.ok) {
        console.log('Assignment marked successfully!');
      } else {
        console.error('Failed to mark assignment.');
      }
    } catch (error) {
      console.error('Error marking assignment:', error);
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
      <TextField label="Student Id" value={studentId} onChange={(e) => setStudentId(e.target.value)} /> {/* Updated label to Student Id */}
      <TextField label="Assignment Number" value={assignmentNumber} onChange={(e) => setAssignmentNumber(e.target.value)} />
      <TextField label="Mark" type="number" value={mark} onChange={(e) => setMark(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Mark
      </Button>
    </Container>
  );
};

export default MarkAssignment;
