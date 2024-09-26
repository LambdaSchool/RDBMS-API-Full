exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(table) {
    // id column, primary key
    table.increments();
    // name column, 128 charLength, not null
    table.string("name", 128).notNullable();
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
