

import * as React from 'react';
 import Appbar from './Appbar';
 import Student from './Student';
 import Teacher from './Teacher';
import TeacherLogin from './TeacherLogin';


export default function AppContent() {
    const [selectedRole, setSelectedRole] = React.useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };
    return (
        <div>
          {selectedRole === null ? (
            <div>
              <h1>Welcome to the Dashboard</h1>
              <p>Please select your role:</p>
              
              <button onClick={() => handleRoleSelection('teacher')}>Login as Teacher</button>
              <button onClick={() => handleRoleSelection('student')}>Login as Student</button>
            </div>
          ) : (
            selectedRole === 'teacher' ? <Teacher /> : <Student />
          )}
        </div>
      );
}