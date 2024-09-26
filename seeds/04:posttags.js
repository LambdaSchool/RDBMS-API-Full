
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posttags').del()
    .then(function () {
      // Inserts seed entries
      return knex('posttags').insert([
        {'postId': 1, 'tagId': 1},
        {'postId': 1, 'tagId': 2},
        {'postId': 2, 'tagId': 5},
        {'postId': 2, 'tagId': 6},
        {'postId': 3, 'tagId': 3},
        {'postId': 4, 'tagId': 4},
        {'postId': 5, 'tagId': 7},
        {'postId': 6, 'tagId': 1},
        {'postId': 6, 'tagId': 2},
        {'postId': 6, 'tagId': 4}
      ]);
    });
};
