const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: process.env.DB_HOST,
    database: 'api',
    port: 5432
});

module.exports = pool;
