
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students',function(tbl){
        tbl.increments();
        tbl.string('name').notNullable().unique('uq_students_name');
        tbl.integer('cohort_id').unsigned().notNullable().references('id').inTable('cohorts');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students')
};
