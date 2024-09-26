// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/blogdb.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'blogdb',
      user:     'Cassidy',
      password: 'TableSays13'
    },

    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
