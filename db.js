const config = require('./knexfile.js');

const knex = require('knex')(config.production);

module.exports = knex;