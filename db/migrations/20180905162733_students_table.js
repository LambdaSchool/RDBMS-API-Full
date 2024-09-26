
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments(); //  generates a primary key called id and makes it auto-increment

        tbl.string('student_name', 128)
        .notNullable()
        .unique('student_name');

        // foreign key
        tbl.integer('cohort_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cohorts');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};
