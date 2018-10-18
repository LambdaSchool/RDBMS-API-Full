// separate knex handler incase of db change
const knex = require('knex');
// grabbing knexfile.js created by knex init
// contains the SQLite database - cohorts table
const knexConfig = require('../knexfile.js');
// configure together
const db = knex(knexConfig.development);

// export the Knex queries
module.exports = {
    find,
    findById,
    add
}

function find() {
    return db('cohorts');
}

function findById(id) {
    return db('cohorts')
        .where({ id })
        .first();

}

function add(cohort) {
    return db('cohorts')
        .insert(cohort)
        .into('cohorts');
}