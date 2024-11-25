exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    // truncate resets the ids back to 1
    return knex('cohorts')
      .truncate()
      .then(function() {
        // Inserts seed entries
        return knex('cohorts').insert([{ name: 'FSW1' }, { name: 'FSW2' }, { name: 'IOS1' }]);
      });
  };