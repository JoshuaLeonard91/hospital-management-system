import React, { useState, useEffect } from 'react';

const PatientList = (props) => {
    const { patients } = props

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {/* patient array list */}
                {patients.map((patient) => (
                    // key required, using patient id
                    <li key={patient.patient_id}>
                        {patient.name} - {patient.age} years old
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
