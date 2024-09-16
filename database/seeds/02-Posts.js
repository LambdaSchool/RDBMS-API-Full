
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: '1', text: 'First post from Chris' },
        {id: 2, user_id: '1', text: 'Second post from Chris' },
        {id: 3, user_id: '2', text: 'First post from Perry' },
        {id: 4, user_id: '3', text: 'First post from Emily' },
        {id: 5, user_id: '2', text: 'Second post from Perry' },
      ]);
    });
};
