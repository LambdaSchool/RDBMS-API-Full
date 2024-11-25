
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', table => {
        table.increments();
        table.string('name').notNullable();
        table.integer('cohorts_id').unsigned().references('id').inTable('cohorts');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
