
exports.up = function(knex, Promise) {
  // implement the change we want in our db
  return knex.schema.createTable('students', function(tbl) {
    // generates a primary key called id amd makes it auto-increment
    tbl
      .increments('id');

    tbl
      .integer('cohort_id')
      .unsigned()
      .notNullable();
      
    tbl
      .string('name', 128)
      .notNullable();

    tbl
      .foreign('cohort_id')
      .references('id')
      .inTable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  // we undo the changes made to the db
  return knex.schema.dropTable('students');
};
