
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table =>{
      table.increments()
      table.string('name').notNullable()
      table.interger('cohorts_id')
        .unsigned()
        .refrences('id')
        .inTable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students')
};
