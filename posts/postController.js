const knex = require('../database/db.js');

const db = {
  getPosts: function() {
    return knex('posts');
  },
  getPostById: function(id) {
    return knex('posts')
    .where({id});
  },
  postPost: function(post) {
    return knex
      .insert(post)
      .into('posts');
  },
  putPostById: function(id, text) {
    return knex('posts')
      .where({id})
      .update({
        text
      });
  },
  deletePostById: function(id) {
    return knex('posts')
    .where({id})
    .del();
  },
};

module.exports = db;