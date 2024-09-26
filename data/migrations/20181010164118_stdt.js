
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stdt', function(tbl) {
      tbl.increments();

      tbl.string('name', 255).notNullable();
      tbl
        .integer('chrt_id')
        .unsigned()
        .references('id')
        .inTable('chrt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stdt');
};
