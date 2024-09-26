
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {student_name: 'Tom Pendleton', cohort_id: 1},
        {student_name: 'Franklin Wright', cohort_id: 3},
        {student_name: 'Tonya Harding', cohort_id: 2}
      ]);
    });
};
