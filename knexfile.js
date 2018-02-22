// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      filename: "postgres://localhost/palette"
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds/dev`
    },
    useNullAsDefault: true
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/palette_test",
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seed: {
      directory: `${__dirname}/db/seeds/test`
    }
  },
  production: {
    client: "pg",
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    useNullAsDefault: true
  }
};
