
exports.up = function(knex, Promise) {
    // implement the change we want in our DB
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments(); //  generates a primary key called id and makes it auto-increment

        tbl.string('name', 128)
        .notNullable()
        .unique('name');
    })
};

exports.down = function(knex, Promise) {
    // undo the change made to the DB by knex:migrate rollback
    return knex.schema.dropTable('cohorts');
};
