// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const { insertQuizData } = require('./database.js');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Configure your PostgreSQL connection
const pool = new Pool({
   user: 'postgres',
    host: 'localhost',
    database: 'quizdb',
    password: 'mysecretpassword',
    port: 5432,
});

// Middleware
app.use(bodyParser.json());

// Endpoint to handle quiz submissions
app.post('/submitQuiz', async (req, res) => {
    try {
        const { name, email, responses, result } = req.body;
        console.log(name);
        console.log(email);
        console.log(responses);
        console.log(result);

        if (!name || !email || !responses) {
            return res.status(400).json({ error: 'Name, email, and responses are required.' });
        }

        // Save the quiz response and result to PostgreSQL
        insertQuizData(name, email, responses, result);

        res.status(201).json({ message: 'Quiz submitted successfully!', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function calculateQuizResult(responses) {

    return 'Your quiz result';
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
