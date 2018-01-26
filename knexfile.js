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
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/palette_test',
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seed: {
      directory: './db/seeds/test'
    }
  }
};
