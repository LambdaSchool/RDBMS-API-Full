
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW 10'},
        {name: 'FSW 11'},
        {name: 'FSW 12'}
      ]);
    });
};
