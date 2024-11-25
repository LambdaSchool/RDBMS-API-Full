const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');
const dbconfig = require('./knexfile')

const server = express();
const db = knex(dbconfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'))

server.get('/api/cohorts', (req, res) =>{
  db('cohorts')
  .then(rows =>{
    res.json(rows)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve information'})
  })
})

server.post('/api/cohorts',(req, res) =>{
  const cohort= req.body
  db('cohorts').insert(cohort)
  .then(ids =>{
    res
    .status(201)
    .json(ids)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to save information to database'})
  })
})

server.get('/api/cohorts/:id',(req, res) =>{
  const { id } = req.params
  db('cohorts').where('id', id)
  .then(rows =>{
    res.json(rows)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve specified id '})
  })
})

server.delete('/api/cohorts/:id',(req, res) =>{
  const { id } = req.params
  db('cohorts')
  .where('id',id)
  .del()
  .then(rowCount =>{
    res
    .status(201)
    .json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to delete specified id '})
  })
})

server.put('/api/cohorts/:id',(req, res) => {
  const { id } = req.params
  const cohort = req.body
  db('cohorts')
  .where('id', id)
  .update(cohort)
  .then(rowCount=>{
    res.json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to modify specified id'})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});