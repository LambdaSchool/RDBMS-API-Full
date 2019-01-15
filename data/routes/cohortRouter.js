const express = require("express")
const router = express.Router()
const nodeDB = require("../knex-db/knexDB")

router.get('/', (req, res) => {
 nodeDB
  .pull()
  .then((cohorts) => {
   res
   .json(cohorts)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error pulling all cohorts from DB."})
  })
})

router.get('/:id', (req, res) => {
 const { id } = req.params
 if (id) { 
  nodeDB
   .pullById(id)
   .then((cohort) => {
    res
     .json(cohort)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error pulling specific cohort from DB."})
   })
  }
})

router.post('/', (req, res) => {
 const cohort = req.body
 nodeDB
  .place(cohort)
  .then(() => {
   res
    .status(201)
    .json(cohort)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error adding cohort to DB."})
  })
})

router.put('/:id', (req, res) => {
 const { id } = req.params
 const cohort = req.body
 if (id && cohort.name && cohort.track) {
  nodeDB
   .alter(id, cohort)
   .then(() => {
    res
     .status(201)
     .json({message: ""})
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error altering cohort in DB."})
   })
  }
})

router.delete('/:id', (req, res) => {
 const { id } = req.params
 if (id) {
  nodeDB
   .clear(id)
   .then()
   .catch()
 }
})