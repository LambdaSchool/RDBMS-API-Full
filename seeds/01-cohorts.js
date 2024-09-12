
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { id: 1, colName: 'CS11' },
        { id: 2, colName: 'CS12' },
        { id: 3, colName: 'CS13' }
      ]);
    });
};
