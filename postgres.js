const { Client } = require('pg');

let connection = null;

async function getConnection() {
  if (!connection) {
    const client = new Client({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    await client.connect();
    connection = client;
    return client;
  }
  return connection;
}

module.exports = getConnection;
