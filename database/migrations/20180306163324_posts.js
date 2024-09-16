exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
    tbl.increments();   // id, primary key

    tbl
      .integer('user_id')  // reference to user id
      .unsigned()
      .references('id')
      .inTable('users');

    tbl
      .text('text')      // body of the post
      .notNullable();

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
