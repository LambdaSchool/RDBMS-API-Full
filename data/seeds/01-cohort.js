
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {name: 'FSW1'},
        {name: 'CSPT3'},
        {name: 'FSWPT2'}
      ]);
    });
};
