exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.increments();

    tbl
      .string("name", 32)
      .notNullable()
      .unique("cohort_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cohorts");
};
