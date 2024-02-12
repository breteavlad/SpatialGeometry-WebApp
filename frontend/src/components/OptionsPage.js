import React from 'react';
import { useLocation, useNavigate, BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default function OptionsPage() {
  const [loggedInUser, setLoggedInUser] = React.useState(""); // State to store the logged-in user
  
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  
  // Function to set the logged-in user when a user logs in
  const handleLogin = (username) => {
    console.log("username in handleLogin: %s",username)
    setLoggedInUser(username);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ marginBottom: '50px', color: '#4a54f1' }}>Choose an option:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '20px' }}><Link to={`/view_progress?username=${username}`} onClick={() => handleLogin(username)} style={{ textDecoration: 'none', color: '#42f554', fontSize: '20px', fontWeight: 'bold' }}>View Progress</Link></li>
        <li style={{ marginBottom: '20px' }}><Link to="/view_lectures" style={{ textDecoration: 'none', color: '#4242f5', fontSize: '20px', fontWeight: 'bold' }}>View Lectures</Link></li>
        <li><Link to="/view_assignment">View Assignments</Link></li>
      </ul>
    </div>
  );
}