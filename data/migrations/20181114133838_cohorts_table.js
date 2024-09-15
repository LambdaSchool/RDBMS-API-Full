//id: primary key, auto-increments.
//name: text, required.
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {

    // primary key
    tbl.increments();
    
    tbl.string('name', 255);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
