import React, { useState, useEffect } from 'react';

const PatientList = ({ patients, handleCheckIn }) => {

    return (
        // <div>
        //     <h1>Patient List</h1>
        //     <ul>
        //         {/* patient array list */}
        //         {patients.map((patient) => (
        //             // key required, using patient id
        //             <li key={patient.patient_id}>
        //                 {patient.name} - {patient.age} years old
        //             </li>
        //         ))}
        //     </ul>
        // </div>

        <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Patient List</h2>
            <div className="space-y-4">
                {patients.map((patient) => (
                    <div
                        key={patient.patient_id}
                        className="flex items-center justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{patient.name}</span>
                            <span className="text-sm text-gray-400">{patient.age} years old</span>
                        </div>
                        <button
                            onClick={() => handleCheckIn(patient.patient_id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Check-In
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
