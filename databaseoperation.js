async function getUserDataByName(name) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM users
      LEFT JOIN quiz_responses ON users.user_id = quiz_responses.user_id
      LEFT JOIN quiz_results ON users.user_id = quiz_results.user_id
      WHERE users.name = $1;
    `, [name]);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      console.log('User Data:', userData);
      return userData;
    } else {
      console.log('User not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  } finally {
    // Close the connection pool when done (for example, when the application exits)
    pool.end();
  }
}

// Usage example:
const userName = 'John Doe';
getUserDataByName(userName);
