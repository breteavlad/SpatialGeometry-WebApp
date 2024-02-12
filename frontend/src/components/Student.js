import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';


import { Container,Paper,Button } from '@mui/material';
//import React, { useEffect, useState } from "react";


// ... (previous imports)

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if the provided username and password exist in the database
    const isValidStudent = students.some(
      (student) => student.username === username && student.password === password
    );

    if (isValidStudent) {
      console.log('Login successful with student name:', username);
      setError(''); // Clear any previous error message
      navigate(`/options?username=${username}`);
    } else {
      console.log('Login not successful!');
      setError('Invalid username or password. Please try again.');
    }
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Login Student</u>
        </h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student Password"
            variant="standard"
            fullWidth
            type="password" // Set the type attribute to "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            id="standard-basic"
            label="Student Username"
            variant="standard"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        {username}
        {password}
        <Paper>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '200px' }}>
            <Button variant="contained" onClick={handleClick} style={{ marginBottom: '20px' }}>
              Submit
            </Button>
            <Link to="/">Back to Dashboard</Link>
          </div>
        </Paper>
      </Paper>
    </Container>
  );
}
