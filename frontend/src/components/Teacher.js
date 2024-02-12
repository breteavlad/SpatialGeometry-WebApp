import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Container, Paper, Button } from '@mui/material';

export default function Teacher() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [teachers, setTeachers] = React.useState([]);

  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const handleClick = async (e) => {
    e.preventDefault();

    // Check if the provided username and password exist in the database
    const isValidTeacher = teachers.some(
      (teacher) => teacher.username === username && teacher.password === password
    );

    if (isValidTeacher) {
      console.log('Login successful');
      setError(''); // Clear any previous error message
      navigate(`/teacher-options?username=${username}`);
    } else {
      console.log('Login not successful!');
      setError('Invalid username or password. Please try again.');
    }
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/student/getAllTeachers')
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setTeachers(result);
        } else {
          console.error('Fetched data is not an array:', result);
        }
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Teacher Login</u>
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
            label="Teacher Password"
            variant="standard"
            fullWidth
            type="password" // Set the type attribute to "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            id="standard-basic"
            label="Teacher Username"
            variant="standard"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        {username}
        {password}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '200px' }}>
          <Button variant="contained" onClick={handleClick} style={{ marginBottom: '20px' }}>
            Submit
          </Button>
          <Link to="/">Back to Dashboard</Link>
        </div>
      </Paper>
    </Container>
  );
}
