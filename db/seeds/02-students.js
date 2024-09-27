
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Will Kwon', cohort_id:3},
        {name:'Eminem',cohort_id:2},
        {name:'T-Rex',cohort_id:1}
      ]);
    });
};
