
exports.up = function(knex, Promise) {
  // implement the change we want in our db
  // commit
  return knex.schema.createTable('cohorts', function(table) {
    // generates a primary key called id and makes it auto-increment.
    table
      .increments('id');

    table
      .string('name', 128)
      .notNullable()
      .unique('name');
      //.defaultTo('not provided'); // don't use this if you want to have each value be unique
  });
};

exports.down = function(knex, Promise) {
  // here we undo the changes made to the db on knex:migrate rollback
  return knex.schema.dropTable('courses');
};
