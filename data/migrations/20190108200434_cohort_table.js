
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort', table => {
    table.increments();
    table.string('name', 125).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohort');
};
