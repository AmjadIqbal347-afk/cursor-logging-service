// Import Knex and dotenv to load environment variables
const knex = require('knex');
require('dotenv').config();

// Create a Knex instance with PostgreSQL connection settings from .env
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
  },
  pool: { min: 2, max: 10 }
});

// Export the Knex instance for use in other modules
module.exports = db; 