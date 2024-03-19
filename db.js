const{Pool} = require("pg");
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.MYDATABASE_URL //connection string to the database
});

module.exports = pool;