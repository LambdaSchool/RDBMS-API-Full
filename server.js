const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// End points

// API GET check
server.get('/', (req, res) => {
    res.send('API is working!')
})

// Get cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohort').then(rows => {
        res.json(rows);  
    }).catch(err => {
        res.status(500).json({err:'Failed to get cohort'})
    });
});

// Select a cohort
server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;

    db('cohort').where('id', id)
    .then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err:'Failed to get cohort'})
    });
});

// Select a cohort
server.get('/api/cohorts/students/:id', (req, res) => {
    const {id} = req.params;

    db('students').where('id', id)
    .then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err:'Failed to get cohort'})
    });
});

// Insert a cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;

    db('cohort').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    }).catch(err => {
        res.status(500).json({err:'Failed to insert cohort'});
    });
});

server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;

    db('cohort').where('id', id).update(cohort)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({err:'Failed to update cohort'});
    })
})

// Delete a cohort
server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohort').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    }).catch(err => {
        res.status(500).json({err:'Failed to delete cohort'});
    })
})

// Port
server.listen(9000, () => {
    console.log("App listening on port 9000")
})