const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// cohorts endpoints
server.post('/api/cohorts', (req, res) => {
    const { name } = req.body;

    db.insert({name}).into('cohorts')
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({id})
    .then(cohort => {
        res.status(200).json(cohort);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students')
    .where({cohort_id: id})
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.put('/api/cohorts/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    db('cohorts')
    .where({id})
    .update({name})
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({id})
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// students endpoints
server.post('/api/students', (req, res) => {
    const { student_name, cohort_id } = req.body;

    db.insert({student_name, cohort_id}).into('students')
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/students', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
    db('students')
    .join('cohorts', {'cohorts.id': 'students.cohort_id'})
    .select('students.id', 'students.student_name', 'cohorts.name')
    .where({'students.id': id})
    .then(student => {
        res.status(200).json(student);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.put('/api/students/:id', (req, res) => {
    const { student_name, cohort_id } = req.body;
    const { id } = req.params;
    db('students')
    .where({id})
    .update({student_name, cohort_id})
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    db('students')
    .where({id})
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.listen(4300, console.log('\n=== Server listening on port 4300 ===\n'))