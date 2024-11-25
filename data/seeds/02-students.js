
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Bob', cohorts_id: 1},
        {name: 'Lindsey', cohorts_id: 2},
        {name: 'Jerome', cohorts_id: 3},
      ]);
    });
};
