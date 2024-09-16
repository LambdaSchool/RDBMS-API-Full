exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_tags', (tbl) => {
    tbl.increments();

    tbl
      .integer('post_id')
      .unsigned()
      .references('id')
      .inTable('posts');

    tbl
      .integer('tag_id')
      .unsigned()
      .references('id')
      .inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts_tags');
};
