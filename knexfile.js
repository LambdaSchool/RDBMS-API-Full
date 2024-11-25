// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './students.db3'
    },
    useNullAsDefault: true,
  },
};
