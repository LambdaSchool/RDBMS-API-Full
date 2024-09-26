exports.up = function(knex, Promise) {
  // implement the change we want in our db
  return knex.schema.createTable("students", function(tbl) {
    // generates a primary key called id and makes it auto-increment
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique("uq_student_name");

    // foreign key
    tbl
      .integer("cohort_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  // we undo the changed made to the db on knex:migrate rollback
  return knex.schema.dropTable("students");
};
