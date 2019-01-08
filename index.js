const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile')
const server = express();
const db = knex(dbConfig.development);
const PORT = 5000;

server.use(express.json());


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});