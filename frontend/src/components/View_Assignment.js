import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:8080/student/secondAssignments');
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>View Assignments</h2>
      {assignments.map((assignment) => (
        <div key={assignment.id}>
          <h3>{assignment.title}</h3>
          <p>Number: {assignment.number}</p>
          <p>Due Date: {assignment.dueDate}</p>
          <Link to={`/assignment_description/${assignment.id}`}>View Description</Link>
          <li style={{ marginBottom: '20px' }}><Link to="/file_upload" style={{ textDecoration: 'none', color: '#f54242', fontSize: '20px', fontWeight: 'bold' }}>Complete Assignment</Link></li>
        </div>
      ))}
    </div>
  );
}

export default ViewAssignments;