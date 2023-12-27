const { Pool } = require('pg');

// Replace these connection details with your PostgreSQL database details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quizdb',
  password: 'mysecretpassword',
  port: 5432,
});

async function createTables() {
  try {
    // Create 'users' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);

    // Create 'quiz_responses' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_responses (
        response_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        question_number INT NOT NULL,
        keyword VARCHAR(1) NOT NULL,
        PRIMARY KEY (user_id, question_number)
      );
    `);

    // Create 'quiz_results' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_results (
        result_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        result_statement TEXT NOT NULL
      );
    `);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

async function insertQuizData(name, email, responses, resultStatement) {
  try {
    // Insert data into 'users' table
    const userInsertResult = await pool.query(`
      INSERT INTO users (name, email) VALUES ($1, $2) RETURNING user_id;
    `, [name, email]);

    const userId = userInsertResult.rows[0].user_id;

    // Insert data into 'quiz_responses' table
    var num = 1;
    for (const response of responses) {
      await pool.query(`
        INSERT INTO quiz_responses (user_id, question_number, keyword)
        VALUES ($1, $2, $3);
      `, [userId, num, response]);
      num++;
    }

    // Insert data into 'quiz_results' table
    await pool.query(`
      INSERT INTO quiz_results (user_id, result_statement)
      VALUES ($1, $2);
    `, [userId, resultStatement]);

    console.log('Quiz data inserted successfully.');
  } catch (error) {
    console.error('Error inserting quiz data:', error);
  } finally {
    // Close the connection pool when done (for example, when the application exits)
  }
}

// Uncomment the line below if you want to create tables
// createTables();

module.exports = { insertQuizData };
