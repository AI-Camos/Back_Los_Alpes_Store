const { Pool } = require('pg');

var pool = null

function getPool() {
  if (!pool) {
    const pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    return pool;
  }
  return pool;
}


module.exports = getPool;
