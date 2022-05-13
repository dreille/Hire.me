const { Pool } = require('pg');
const dotEnv = require('dotenv').config();

const PG_URI = `postgres://${process.env.DB_NAME}:${process.env.DB_PASS}${process.env.DB_HOST}${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString: PG_URI,
});

// Export query object with function to log query being run:
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
