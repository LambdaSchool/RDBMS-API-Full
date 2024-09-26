
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {'userId': 1, text: 'DANBOT1 Testy test test test, testy test test'}, // 1
        {'userId': 3, text: 'JuneBug1 Testy test test test, testy test test'}, // 2
        {'userId': 2, text: 'Leighnie123-1 Testy test test test, testy test test'}, // 3
        {'userId': 3, text: 'JuneBug2 Testy test test test, testy test test'}, // 4
        {'userId': 2, text: 'Leighnie123-2 Testy test test test, testy test test'}, // 5
        {'userId': 1, text: 'DANBOT2 Testy test test test, testy test test'} // 6
      ]);
    });
};
