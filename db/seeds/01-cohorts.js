
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'UX Design 1'},
        {name: 'iOS 2'},
        {name: 'Full Stack Web Infinity'}
      ]);
    });
};
