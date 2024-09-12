
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function (table) {
    // primary key id
    table.increments()
    // name text required
    table.string('name', 255)
         .notNullable()
         .unique('name')
    // cohort_id id from cohorts
    table.integer('cohort_id')

    table.foreign('cohort_id').references('cohorts.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
