// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/usersdb.db'
    },
    migrations: {
      tableName: 'migrations',
    },
    useNullAsDefault: true,
  }
  // production: {
  //   client: 'mysql',
  //   connection: {
  //     host: 'localhost',
  //     database: 'usersdb',
  //     user:     'jason',
  //     password: 'pass'
  //   },
  //   migrations: {
  //     tableName: 'migrations'
  //   }
  // }

};
