const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(express.json());

const port = 8000;

server.get('/', (req, res)=> {
    res.send('Hello :)');
});

server.listen(port, ()=> console.log(`API running on port ${port}`));