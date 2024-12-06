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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Website: http://localhost:${PORT}`);
});
