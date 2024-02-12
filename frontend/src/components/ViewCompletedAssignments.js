import React, { useState } from 'react';

function ViewCompletedAssignments() {
  const [studentName, setStudentName] = useState('');
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Please enter a student name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/completedAssignments/${studentName}`);
      if (response.ok) {
        const data = await response.json();
        setCompletedAssignments(data);
        setError('');
      } else if (response.status === 204) {
        setCompletedAssignments([]);
        setError('No completed assignments found for the student.');
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError('Error fetching completed assignments. Please try again later.');
    }
  };

  const handleAssignmentClick = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:8080/student/completedAssignments/${studentName}/content/${assignmentId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank'); // Open the PDF content in a new tab
      } else {
        setError('Error fetching assignment content.');
      }
    } catch (error) {
      setError('Error fetching assignment content. Please try again later.');
    }
  };

  return (
    <div>
      <h2>View Completed Assignments</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </label>
        <button type="submit">View Completed Assignments</button>
      </form>

      {error && <p>{error}</p>}

      {completedAssignments.length > 0 && (
        <div>
          <h3>Completed Assignments for {studentName}</h3>
          <ul>
            {completedAssignments.map((assignment) => (
              <li key={assignment.id}>
                Title: {assignment.title}, File Name: {assignment.fileName}
                <button onClick={() => handleAssignmentClick(assignment.id)}>View Content</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewCompletedAssignments;
