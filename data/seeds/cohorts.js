
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'rowValue1'},
        { name: 'rowValue2'},
        { name: 'rowValue3'}
      ]);
    });
};
