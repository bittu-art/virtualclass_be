// const knex = require('knex');
const db ={
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 5432,
  },
  pool: {
    min: 2,
    max: 20,                       // Max clients
    idleTimeoutMillis: 30000,      // Close idle clients after 30s
    createTimeoutMillis: 3000,     // Time to wait before failing to create a connection
    acquireTimeoutMillis: 2000,    // Time to wait for acquiring an existing connection
  },
 
}

module.exports = db;
