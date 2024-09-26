
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tag: 'js'},
        {id: 2, tag: 'html'},
        {id: 3, tag: 'css'}
      ]);
    });
};
