
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Full Stack Web 14'},
        {name: 'Computer Science 2'},
        {name: 'UI/UX 4'}
      ]);
    });
};
