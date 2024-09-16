const knex = require('../database/db.js');

const db = {
  getTags: function() {
    return knex('tags');
  },
  getTagById: function(id) {
    return knex('tags')
    .where({id});
  },
  postTag: function(tag) {
    return knex
      .insert(tag)
      .into('tags');
  },
  putTagById: function(id, tag) {
    return knex('tags')
      .where({id})
      .update({
        tag
      });
  },
  deleteTagById: function(id) {
    return knex('tags')
    .where({id})
    .del();
  },
};

module.exports = db;