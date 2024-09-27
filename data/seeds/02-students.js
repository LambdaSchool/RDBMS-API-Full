
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Hulk Hogan', cohort_id: 1},
        {name: 'Jasper T. Jones', cohort_id: 2},
        {name: 'Sid Vicious', cohort_id: 3}
      ]);
    });
};
