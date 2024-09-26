
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posttags', function(tbl) {
    tbl.integer('tagsid').notNullable().references('id').inTable('tags');
    tbl.integer('postsid').notNullable().references('id').inTable('posts');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('posttags');
};
