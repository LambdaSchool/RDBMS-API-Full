const db = require('../dbConfig');
 module.exports = {
  get,
  insert,
  update,
  remove
};
 function get(id) {
  let query = db('students');
  if (id) return query.where({ id: Number(id) }).first();
  return query;
}
 function insert(name) {
  return db('students').insert(name);
}
 function update(id, name) {
  return db('students')
    .where({ id: Number(id) })
    .update(name);
}
 function remove(id) {
  return db('students')
    .where({ id: Number(id) })
    .del();
}