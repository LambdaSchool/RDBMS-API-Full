
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posttags', function(tbl) {
        tbl.increments('id');
        tbl.integer('postId')
          .notNullable()
          .references('id')
          .inTable('posts')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        tbl.integer('tagId')
          .notNullable()
          .references('id')
          .inTable('tags')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posttags');
  };
  