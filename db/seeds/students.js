
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Justin', cohort_id: 10},
        {name: 'Dave', cohort_id: 13}
        {name: 'John', cohort_id: 15},
      ]);
    });
};
