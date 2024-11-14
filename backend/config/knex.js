require('dotenv').config();

const knex = require('knex')({
  client: process.env.DB_TYPE,
  connection: {
    timezone: 'utc',//
    // timezone: '+05:30',//
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // debug: process.env.KNEX_DEBUG?true:false,
    charset: 'utf8mb4'
  },
});

module.exports = knex;