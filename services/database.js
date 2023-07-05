//conexion a la base

const db = require("knex")({
  client: `pg`,
  version: `7.2`,
  connection: {
    host: `127.0.0.1`,
    port: 5432,
    user: `postgres`,
    password: ``,
    database: `Sprint8`,
  },
});

module.exports = db;
