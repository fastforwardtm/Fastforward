const { Pool } = require('pg');

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
    return pool;
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
};

module.exports = connectDB;
