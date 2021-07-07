
exports.up = function(knex, Promise) {
  // implement change you want in db
  return knex.schema.createTable('students', function(tbl) {
    // generates a primary key called id and makes it auto-increment
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique('students_name');

    // foreign key
    tbl
    .integer('cohort_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
  // undo change made to db, rollback
  return knex.schema.dropTable('students');
};
