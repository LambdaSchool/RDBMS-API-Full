
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'DanBotTEST'},
        {name: 'Leighnie123TEST'},
        {name: 'JuneBugTEST'}
      ]);
    });
};
