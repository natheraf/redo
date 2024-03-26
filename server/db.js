const{Pool} = require("pg");
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL //connection string to the database
});

module.exports = pool;