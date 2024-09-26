
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_tags').insert([
        {postId: 1, tagId: 1},
        {postId: 1, tagId: 2},
        {postId: 3, tagId: 1}
      ]);
    });
};
