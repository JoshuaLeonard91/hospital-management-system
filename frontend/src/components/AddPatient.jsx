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

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="w-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        className="w-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2"
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <select
                        className="w-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <input
                        className="w-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2"
                        type="text"
                        name="contact_info"
                        placeholder="Contact Info"
                        value={formData.contact_info}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <textarea
                        className="w-64 h-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2"
                        name="medical_history"
                        placeholder="Medical History"
                        value={formData.medical_history}
                        onChange={handleChange}
                    ></textarea>
                </div >
                <button className="w-64 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/50 px-3 py-2" type="submit">Add Patient</button>
            </form>
        </div>
    );
};

export default AddPatient;

