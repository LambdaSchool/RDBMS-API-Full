const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexconfig = require('./knexfile.js');

const db = knex(knexconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(500).json({ error: 'Please provide a name field.' });
    } else {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error adding cohort.', err });
            });
    }
});

const port = 3300;
server.listen(port, function() {
    console.log(`\n---- Lambda API Listening on http://localhost:${port} ----\n`);
})