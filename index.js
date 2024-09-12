const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json({ errorMessage: 'Information for cohorts not received' }));
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort)
        .into('cohorts')
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => res.status(500).json({ errorMessage: 'Error saving to database' }));
});

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json({ errorMessage: `Information for cohort ${id} not received` }));
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where('id', '=', id)
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json({ errorMessage: `Student information for cohort ${id} not received` }));
});

server.put('/api/cohorts/:id', (req, res) => {
    const edit = req.body;
    const { id } = req.params;
    db('cohorts')
        .where('id', '=', id)
        .update(edit)
        .then(count => {
            res.status(200).json({ message: `${count} record(s) successfully updated.` })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error updating record.' })
        });
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json({ message: `${count} record(s) successfully deleted.` })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error deleting record.' })
        });
});
