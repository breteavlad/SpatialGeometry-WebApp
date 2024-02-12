// App.js

import './App.css';
import * as React from 'react';
import Appbar from './components/Appbar';
import Student from './components/Student';
import Teacher from './components/Teacher';
import AppContent from './components/AppContent';
import OptionsPage from './components/OptionsPage';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import FileUpload from './components/FileUpload';
import ViewProgress from './components/ViewProgress';
import ViewLectures from './components/ViewLectures';
import OptionsPageTeacher from './components/OptionsPageTeacher';
import AddLecture from './components/Add_Lecture';
import Mark_Assignment from './components/Mark_Assignment';
import Add_Assignment from './components/Add_Assignment';
import View_Assignment from './components/View_Assignment';
import AssignmentDescription from './components/AssignmentDescription';
import ViewCompletedAssignment from './components/ViewCompletedAssignments';

function App() {
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [loggedInUser, setLoggedInUser] = React.useState(null);
 

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleLoggedInUser = (username)=>{
    setLoggedInUser(username);
  } 

  return (
    <div className="App">
      <Appbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
            
              <p><Link to="/appcontent">Go to App Content</Link></p>
            </div>
          } />

        <Route path="/options" element={<OptionsPage />} /> 
         <Route path="/teacher" element={<Teacher />} /> 
          <Route path="/student" element={<Student />} />
          <Route path="/appcontent" element={<AppContent selectedRole={selectedRole} handleRoleSelection={handleRoleSelection} />} />
          <Route path="/student" element={<Student />} />
          <Route path="/file_upload" element={<FileUpload />} />
          <Route path="/view_progress" element={<ViewProgress />} />
          <Route path="/view_lectures" element={<ViewLectures />} />
          <Route path="/teacher-options" element={<OptionsPageTeacher />} />
          <Route path="/add_lecture" element={<AddLecture />} />
          <Route path="/mark_assignment" element={<Mark_Assignment />} />
          <Route path="/add_assignment" element={<Add_Assignment />} />
          <Route path="/view_assignment" element={<View_Assignment />} />
          <Route path="/assignment_description/:id" element={<AssignmentDescription />} />
          <Route path="/view_completedassignment" element={<ViewCompletedAssignment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
