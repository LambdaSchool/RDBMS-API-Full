
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
    tbl.increments('id');
    tbl.integer('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.text('text').notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');    
};
