
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stdt').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('stdt').insert([
        {name: 'Maria Andreasson', chrt_id: 2},
        {name: 'Aleš Witherspoon', chrt_id: 1},
        {name: 'Frieda Wruck', chrt_id: 3}
      ]);
    });
};
