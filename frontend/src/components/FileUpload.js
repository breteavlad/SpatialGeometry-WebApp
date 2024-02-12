import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [id, setId] = useState('');

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !studentName || !assignmentTitle) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentName', studentName);
    formData.append('assignmentTitle', assignmentTitle);
    formData.append('id', id);

    fetch('http://localhost:8080/student/addCompletedAssignment', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>File Uploading</h2>
      <form>
        <input type="file" name="file" onChange={handleFile} />
        <br />
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Assignment Title:
          <input
            type="text"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
  Assignment ID:
  <input
    type="text"
    value={id}
    onChange={(e) => setId(e.target.value)}
  />
</label>
<br />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
