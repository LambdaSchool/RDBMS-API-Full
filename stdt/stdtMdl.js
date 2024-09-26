const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    findStdt,
    findStdtById,
    addStdt,
    updateStdt,
    removeStdt,
}

function findStdt() {
    return db('stdt');
}

function findStdtById(id) {
    return db('stdt')
        .where({ id })
        .first();
}

function addStdt(stdt) {
    return db('stdt')
        .insert(stdt)
        .into('stdt')
}

function updateStdt(id, changes) {
    return db('stdt')
        .where({ id })
        .update(changes)
}

function removeStdt(id) {
    return db('stdt')
        .where({ id })
        .del();
}