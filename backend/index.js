const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./hospitalDatabase');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hospital Management System');
});

// Doctors backend

app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM doctors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err.message);
            res.status(500).send('Error fetching doctors');
        } else {
            res.json(results);
        }
    });
});


// Patients backend

app.get('/patients', (req, res) => {
    const sql = 'SELECT * FROM patients';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Errors:', err.message);
            res.status(500).send('Error');
        } else {
            res.json(results);
        }
    });
});

// Add Patients

app.post('/patients', (req, res) => {
    const { name, age, gender, contact_info, medical_history } = req.body;
    const sql =
        'INSERT INTO patients (name, age, gender, contact_info, medical_history) VALUES (?, ?, ?, ?, ?)';
    db.query(
        sql,
        [name, age, gender, contact_info, medical_history],
        (err, result) => {
            if (err) {
                console.error('Error adding patient:', err.message);
                res.status(500).send('Error adding patient');
            } else {
                const newPatient = {
                    patient_id: result.insertId,
                    name,
                    age,
                    gender,
                    contact_info,
                    medical_history,
                };
                res.json(newPatient);
            }
        }
    );
});

// Get Appointments 

app.get('/appointments', (req, res) => {
    const sql = `
        SELECT a.appointment_id, a.appointment_date, a.status,
               p.name AS patient_name, d.name AS doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        JOIN doctors d ON a.doctor_id = d.doctor_id;
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err.message);
            res.status(500).send('Error fetching appointments');
        } else {
            res.json(results);
        }
    });
});

// Add Appointments

app.post('/appointments', (req, res) => {
    const { patient_id, doctor_id, appointment_date } = req.body;
    const sql = `
        INSERT INTO appointments (patient_id, doctor_id, appointment_date)
        VALUES (?, ?, ?);
    `;
    db.query(sql, [patient_id, doctor_id, appointment_date], (err, result) => {
        if (err) {
            console.error('Error adding appointment:', err.message);
            res.status(500).send('Error adding appointment');
        } else {
            res.json({
                message: 'Appointment added successfully',
                appointment_id: result.insertId,
            });
        }
    });
});

app.post('/check-in/:patientId', (req, res) => {
    const patientId = req.params.patientId;

    const query = 'UPDATE patients SET checked_in = 1 WHERE patient_id = ?';
    db.query(query, [patientId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error checking in patient' });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: 'Patient checked in successfully' });
            } else {
                res.status(404).json({ message: 'Patient not found' });
            }
        }
    });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Website: http://localhost:${PORT}`);
});
