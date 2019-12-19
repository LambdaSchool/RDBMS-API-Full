const express = require('express')
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
const port = 9000;
server.use(express.json());


server.get('/', (req, res) => {
    res.json({ api: 'running properly' });
});

// GET Requests

server.get('/api/cohorts', (req,res) => {
    db('cohorts')
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id', (req,res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id : id})
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id/students', (req,res) => {
    const { id } = req.params;
    db('students')
    .where({ cohort_id : id})
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
})

// POST Requests

server.post('/api/cohorts', (req,res) => {
    const addedCohort = req.body;
    db('cohorts')
    .insert(addedCohort)
    .then(cohortID => res.status(200).json(cohortID))
    .catch(err => res.status(500).json(err));
})

// PUT Requests

server.put('/api/cohorts/:id', (req,res) => {
    const { id } = req.params;
    const edits = req.body;
    db('cohorts')
    .where({ id : id})
    .update(edits)
    .then(editedCohort => res.status(200).json({editsMade : editedCohort}))
    .catch(err => res.status(500).json(err));
})

// DELETE Requests

server.delete('/api/cohorts/:id', (req,res) => {
    const { id } = req.params;
    
    db('cohorts')
    .where({ id : id})
    .del()
    .then(count => res.status(200).json({itemsDeleted : count}))
    .catch(err => res.status(500).json(err));
})



server.listen(port, () => {console.log(`Server Running on Port ${port}`)})