
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(tbl) {
        tbl.increments('id');
        tbl.integer('usersid').notNullable().references('id').inTable('users');
        tbl.integer('tagsid').references('id').inTable('tags');
        tbl.string('text', 2147483647).notNullable();
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('posts');
};
