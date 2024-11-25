
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.integer('cohort_id').unsigned().references('id').inTable('cohorts');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };