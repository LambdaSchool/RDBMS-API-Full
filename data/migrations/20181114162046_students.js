exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(table) {
    // id col, primary key
    table.increments();
    // name column, 128 charLength, not null
    table.string("name", 128);
    // foreign key, not null, references cohorts table's id
    table
      .integer("cohort_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cohorts");
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
