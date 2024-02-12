import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OptionsPageTeacher() {
  const [loggedInUser, setLoggedInUser] = React.useState(""); // State to store the logged-in user
  const [studentName, setStudentName] = React.useState(""); // State to store the name of the student
  
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  
  // Function to set the logged-in user when a user logs in
  const handleLogin = (username) => {
    console.log("username in handleLogin: %s",username)
    setLoggedInUser(username);
  };

  // Function to handle the input of the student name
  const handleStudentNameInput = (event) => {
    setStudentName(event.target.value);
  };

  return (
    <div>
      <h2>Choose an option:</h2>
      <ul>
        <li><Link to="/add_assignment">Add Assignment</Link></li>
        <li><Link to="/mark_assignment">Mark Assignment</Link></li>
        <li><Link to={`/view_progress?username=${studentName}`} onClick={() => handleLogin(username)}>View Student Progress</Link></li>
        <li><Link to="/add_lecture">Add Lecture</Link></li>
        <li><Link to="/view_lectures">View Lectures</Link></li>
        <li><Link to="/view_assignment">View Assignments</Link></li>
        <li><Link to="/view_completedassignment">View Completed Assignments</Link></li>
      </ul>
      <input type="text" placeholder="Enter student name" value={studentName} onChange={handleStudentNameInput} />
    </div>
  );
}