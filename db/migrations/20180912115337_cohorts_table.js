exports.up = function(knex, Promise) {
  // implement the change we want in our db
  return knex.schema.createTable("cohorts", function(tbl) {
    // generates a primary key called id and makes it auto-increment
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique("name");
    //.defaultTo('not provided')
  });
};

exports.down = function(knex, Promise) {
  // we undo the changed made to the db on knex:migrate rollback
  return knex.schema.dropTable("cohorts");
};

// yarn add knex migrate:make courses_table
// yarn add knex migrate:latest
// yarn add knex migrate:rollback
