const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')

const server = express()
const db = knex(knexConfig.development)

server.use(express.json())

server.get('/cohorts', async (req, res) => {
  const cohorts = await db.select().table('cohorts')
  res.status(200).json(cohorts)
})

server.get('/cohorts/:id', async (req, res) => {
  const cohort = await db.select().table('cohorts').where('id', req.params.id)

  if (cohort.length === 0) {
    res.status(500).json({ message: `cohort ${req.params.id} is not found in database` })  
  } else {
    res.status(200).json(cohort)
  }
})

server.get('/cohorts/:id/students', async (req, res) => {
  const studentInThisCohort = await db.select().table('students').where('cohort_id', req.params.id)

  if (studentInThisCohort.length === 0) {
    res.status(500).json({ message: `cohort ${req.params.id} is not found in database` })  
  } else {
    res.status(200).json(studentInThisCohort)
  }
})

server.post('/cohorts', (req, res) => {
  db.insert(req.body)
    .into('cohorts')
    .then(id => res.status(201).json(id[0]))
    .catch(error => res.status(500).json(error))
})

server.delete('/cohorts/:id', (req, res) => {
  db.table('cohorts')
    .where('id', req.params.id)
    .del()
    .then(id => res.status(201).json({ message: "deleted successfully" }))
    .catch(error => res.status(500).json(error))
})

server.put('/cohorts/:id', (req, res) => {
  db.table('cohorts')
    .where('id', req.params.id)
    .update({
      id: req.params.id,
      ...req.body
    })
    .then(id => res.status(201).json({ message: "updated successfully" }))
    .catch(error => res.status(500).json(error))
})

server.get('/students/:id', async (req, res) => {
  const student = await db.select().table('students').where('id', req.params.id)
  const cohortName = await db.select('name').table('cohorts').where('id', student[0]['cohort_id'])

  if (student === 0) {
    res.status(500).json({ message: `student ${req.params.id} is not found in database` })  
  } else {
    res.status(200).json({
      id: student[0].id,
      name: student[0].name,
      cohort: cohortName[0].name
    })
  }
})

server.listen('3300', () => {
  console.log(`\n=== Web API Listening on http://localhost:3300 ===\n`)
})