
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl){
    tbl.increments('id').primary();
    tbl.integer('userId')
      .notNullable()
      .references('id')
      .inTable('users');
    tbl.string('text', 1000).notNullable().unique('text');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('posts');
};
