
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_tags', function(tbl){
    tbl.increments('id').primary();
    tbl.integer('tagId')
      .references('id')
      .inTable('tags');
    tbl.integer('postId')
      .references('id')
      .inTable('posts');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('posts_tags');
};
