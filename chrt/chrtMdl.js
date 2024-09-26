const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    findChrt,
    findChrtById,
    findChrtStdt,
    addChrt,
    updateChrt,
    removeChrt,
}

function findChrt() {
    return db('chrt');
}

function findChrtById(id) {
    return db('chrt')
        .where({ id })
        .first();
}

function findChrtStdt(chrt_id) {
    return db('stdt')
        .where('chrt_id', chrt_id);
}

function addChrt(chrt) {
    return db('chrt')
        .insert(chrt)
        .into('chrt')
}

function updateChrt(id, changes) {
    return db('chrt')
        .where({ id })
        .update(changes)
}

function removeChrt(id) {
    return db('chrt')
        .where({ id })
        .del();
}