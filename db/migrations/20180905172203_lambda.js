exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', (tbl) => {
        tbl.increments();
  
        tbl.string('name', 128).notNullable();
        tbl
            .string('cohort_id')
            .references('id')
            .inTable('cohorts');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
  };