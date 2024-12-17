import React, { useState, useEffect } from 'react'

export default function AppointmentList() {

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:5000/appointments');
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);

            } catch (err) {
                setError(err.message)
            }
        }
        fetchAppointments();
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                PLACEHOLDER
                {appointments.map((appointments) => (
                    <li> key={appointments.appointments_id}
                        {appointments.appointment_date} -
                        {appointments.paitient_name} with Dr.
                        {appointments.doctor_name}
                        ({appointments.status})
                    </li>
                ))}
            </ul>
        </div>
    )
}
