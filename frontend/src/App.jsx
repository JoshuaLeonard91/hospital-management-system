import React, { useState, useEffect } from 'react';
import './index.css';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList'
import AppointmentList from './components/AppointmentList'
import AddPatient from './components/AddPatient';
import AddAppointment from './components/AddAppointment';

function App() {

  const [patients, setPatients] = useState([]); // Send as prop to PatientList.jsx
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null); // set errors

  useEffect(() => {
    const fetchData = async () => {
      const [patientRes, doctorRes] = await Promise.all([
        fetch('https://hospital-management-system-1-le0b.onrender.com/patients'),
        fetch('https://hospital-management-system-1-le0b.onrender.com/doctors')
      ])
      setPatients(await patientRes.json());
      setDoctors(await doctorRes.json());
    }
    fetchData();
  }, []);

  // Add a new patient to the list
  const patientAddedHandler = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  const handleCheckIn = async (patientId) => {
    try {
      const response = await fetch(`https://hospital-management-system-1-le0b.onrender.com/check-in/${patientId}`, {
        method: 'POST', // Change to POST instead of PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked_in: true }), // This may be optional based on your backend
      });

      if (!response.ok) {
        throw new Error('Failed to check in patient');
      }

      // Remove the checked-in patient from the list
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.patient_id !== patientId)
      );
    } catch (error) {
      console.error('Error checking in patient:', error);
    }
  };

  return (
    <>
      <Dashboard patients={patients} handleCheckIn={handleCheckIn} patientAddedHandler={patientAddedHandler} />
      {/* <h1>Hospital Management System</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <AddPatient patientAddedHandler={patientAddedHandler} />
      <PatientList patients={patients} />
      <AddAppointment patients={patients} doctors={doctors} />
      <AppointmentList /> */}

    </>
  )
}

export default App
