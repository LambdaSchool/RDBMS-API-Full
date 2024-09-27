const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  insert,
  findById,
  remove,
  update
}

function find() {
  return db('students');
}

function findById(id) {
  return db('students').where({ id: Number(id)})
}

function insert(student) {
  return db('students')
            .insert(student)
            .then(ids => ({ id: ids[0] }))
}

function remove(id) {
  return db('students')
    .where('id', Number(id))
    .del();
}

function update(id, student) {
  return db('students')
    .where('id', Number(id))
    .update(student);
}