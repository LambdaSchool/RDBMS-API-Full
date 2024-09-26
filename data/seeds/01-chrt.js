
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chrt').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('chrt').insert([
        {name: 'FSW1'},
        {name: 'FSW2'},
        {name: 'FSW3'}
      ]);
    });
};
