
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, userId: 1, text: 'user1_text'},
        {id: 2, userId: 2, text: 'user2_text'},
        {id: 3, userId: 2, text: 'user2_text1'},
        {id: 4, userId: 2, text: 'user2_text2'},
        {id: 5, userId: 3, text: 'user3_text'}
      ]);
    });
};
