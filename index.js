const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const port = 5000;

server.use(express.json());

//INSERT INTO table_name(fields) VALUES ('values','values')
server.post('/api/cohorts', (req, res) =>{
    const newCohort = req.body;
    db('cohorts').insert(newCohort)
        then(id =>{
            res.status(201).json(ids)
        })
        .catch(err =>{
            res.status(500).json({err : 'Could not add new cohort to database'})
        })
    
})
//SELECT * FROM cohorts

server.get('/api/cohorts' , (req, res) =>{
    db('cohorts').then(rows =>{
        res.json(rows)
    })
    .catch(err =>{
        res.status(500).json({err: 'Failed to find cohorts'})
    })
})
//SELECT * FROM cohorts WHERE id = {id}
server.get('/api/cohorts/:id', (req, res) =>{
    const {id} = req.params;
    db('cohorts').where('id', id)
        .then(rows =>{
            res.json(rows)
        })
        .catch(err =>{
            res.status(500).json({err: 'Failed to find cohort with specified ID'})
        })
})

//UPDATE crayons SET field WHERE id = {id}
server.put('/api/cohorts/:id', (req, res) =>{
    const {id} = req.params;
    const cohort = req.body;
    db('cohorts').where('id', id)
        .update(cohort)
            .then(rowCount =>{
                res.json(rowCount)
            })
            .catch(err =>{
                res.status(500).json({err: 'Failed to update cohort'})
            })
})

//DELETE FROM cohorts WHERE id = {id}
server.delete('/api/cohorts/:id', (req, res) =>{
    const {id} = req.params;
    db('cohorts').where('id', id).del()
        .then(rowCount =>{
            res.status(201).json(rowCount)
        })
        .catch(err =>{
            res.status(500).json({err: 'Failed to delete cohort'})
        })
})

server.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
})