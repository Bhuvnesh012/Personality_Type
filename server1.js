// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
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

// Endpoint to fetch all quiz data
app.get('/fetchAllQuizData', async (req, res) => {
    try {
        // Fetch all quiz data from the database
        const quizData = await getAllQuizData();

        res.status(200).json({ data: quizData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to get all quiz data
async function getAllQuizData() {
    const client = await pool.connect();
    try {
        // Customize the SQL query based on your table structure
        const result = await client.query('SELECT * FROM quiz_results');

        return result.rows;
    } finally {
        client.release();
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
