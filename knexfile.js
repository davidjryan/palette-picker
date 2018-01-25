// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/palette'
    },
    migrations: {
      directory: './db/migrations'
    },
    seed: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
