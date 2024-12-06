import React, { useState } from 'react';

const AddPatient = ({ patientAddedHandler }) => {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contact_info: '',
        medical_history: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add patient');
            }

            const newPatient = await response.json();
            patientAddedHandler(newPatient);
            setSuccess(true);

            // Clear the form
            setFormData({
                name: '',
                age: '',
                gender: '',
                contact_info: '',
                medical_history: '',
            });
        } catch (err) {
            setError(err.message);
        }
    };

    // TODO: STYLING
    return (
        <div>
            <h2>Add New Patient</h2>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {success && <div style={{ color: 'green' }}>Patient added successfully!</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="contact_info"
                    placeholder="Contact Info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="medical_history"
                    placeholder="Medical History"
                    value={formData.medical_history}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Add Patient</button>
            </form>
        </div>
    );
};

export default AddPatient;

