import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList'

function App() {

  const [patients, setPatients] = useState([]); // Send as prop to PatientList.jsx
  const [error, setError] = useState(null); // set errors

  useEffect(() => {
    fetch('http://localhost:5000/patients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <>
      <h1>Hospital Management System</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <PatientList patients={patients} />
    </>
  )
}

export default App
