const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
module.exports = {
  get,
  getCohortStudents,
  insert,
  update,
  remove
};
function get(id) {
  let query = db("cohorts");
  if (id) return query.where({ id: Number(id) }).first();
  return query;
}
function getCohortStudents(id) {
  return db("cohorts as c")
    .join("students as s", "s.cohort_id", "c.id")
    .select("s.id", "s.name")
    .where("c.id", id);
}
function insert(name) {
  return db("cohorts").insert(name);
}
function update(id, name) {
  return db("cohorts")
    .where({ id: Number(id) })
    .update(name);
}
function remove(id) {
  return db("cohorts")
    .where({ id: Number(id) })
    .del();
}
