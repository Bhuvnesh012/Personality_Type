// app.js
const { runQuery } = require('./queries');

async function main() {
  try {
    await runQuery();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection pool when done (for example, when the application exits)
    pool.end();
  }
}

main();
