// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: `pg`,
    version: `7.2`,
    connection: {
      host: `127.0.0.1`,
      port: 5432,
      user: `postgres`,
      password: ``,
      database: `Sprint8`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
