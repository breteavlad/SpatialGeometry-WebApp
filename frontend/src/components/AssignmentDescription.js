import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AssignmentDescription() {
  const { id } = useParams();
  

  
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/description?assignmentId=${id}`);
        const data = await response.text(); // Receive the response as text
        setDescription(data); // Set the assignment description
      } catch (error) {
        console.error('Error fetching assignment:', error);
      }
    };
  
    fetchAssignment();
  }, [id]);
  
  // Split the assignment string into name and description

  
  return (
    <div>
    
      <p>{description}</p>
    </div>
  );
}

export default AssignmentDescription;