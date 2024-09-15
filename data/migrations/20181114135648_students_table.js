//id: primary key, auto-increments.
//name: text, required.
//cohort_id: references the id in the cohorts table.
exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    // primary key
    tbl.increments();

    tbl.string("name", 255);

    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("students");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
