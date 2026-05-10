const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');


const dbPool = new Pool({
    connectionString: process.env.DBConnectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = dbPool;