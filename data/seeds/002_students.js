
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Daniel'},
        {cohort_id: 1, name: 'Melissa'},
        {cohort_id: 1, name: 'Hector'},
        {cohort_id: 1, name: 'Natalie'},
        {cohort_id: 2, name: 'Daniel2'},
        {cohort_id: 2, name: 'Melissa2'},
        {cohort_id: 2, name: 'Hector2'},
        {cohort_id: 2, name: 'Natalie2'},
        {cohort_id: 3, name: 'Daniel3'},
        {cohort_id: 3, name: 'Melissa3'},
        {cohort_id: 3, name: 'Hector3'},
        {cohort_id: 3, name: 'Natalie3'},
      ]);
    });
};
