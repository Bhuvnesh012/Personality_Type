// queries.js
const pool = require('./db');

async function runQuery() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() AS current_time');
    console.log('Result:', result.rows[0].current_time);
  } finally {
    client.release();
  }
}

module.exports = { runQuery };
