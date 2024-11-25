const express = require('express');
const knex = require('knex');

const dbconfig = require('./knexfile');

const server = express();
const db = knex(dbconfig.development);
const PORT = 4000;

server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db.select().from('cohorts')
    .then((cohorts) => {
        res.status(200).json(cohorts);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where({id: id,}).select()
    .then((cohort) => {
        res.status(200).json(cohort);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
    .then((cohort_ids) => {
        res.status(201).json(cohort_ids);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;
    db('cohorts').where('id', id).update(cohort)
    .then((rowCount) => {
        res.status(200).json(rowCount);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id).del()
    .then((rowCount) => {
        res.status(201).json(rowCount);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})