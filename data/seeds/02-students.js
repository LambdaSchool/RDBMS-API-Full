
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Marly', cohort_id : 3},
        {name: 'jouberte', cohort_id: 1},
        {name: 'ruth', cohort_id:2}
      ]);
    });
};
