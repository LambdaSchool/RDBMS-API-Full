const express = require('express');
const router = express.Router();
const db = require('../helpers/cohortHelpers');
const studentDb = require('../helpers/studentHelpers')

router.post('/', (req, res) => {
  const cohort = req.body;
  if(cohort.name.length !== 0) {
    db.insert(cohort)
      .then(cohort => {
        res
          .status(201)
          .json(cohort.id)
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was a problem adding that cohort to the database...", error})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please give the cohort a name!" })
  }
})

router.get('/', (req, res) => {
  db.find()
    .then(cohorts => {
      res
        .status(200)
        .json(cohorts)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble fetching the list of cohorts.", err })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(cohort => {
      if (cohort.length !== 0) {
        res
          .status(200)
          .json(cohort)
      } else {
        res
          .status(404)
          .json({ errorMessage: "There is no cohort with that ID number in this database." })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Sorry, we are having trouble finding that cohort...", error})
    })
})

router.get('/:id/students', (req, res) => {
  const id = req.params.id;
  studentDb.findById(id)
    .then(students => {
      if (students.length !== 0) {
        res
          .status(200)
          .json(students)
      } else {
        res
          .status(404)
          .json({ errorMessage: "There are no students enrolled in that cohort!"})
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Sorry, we're having some trouble finding the students you're looking for.", error })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if(changes.name.length > 0) {
    db.update(id, changes)
      .then(count => {
        if (count) {
          res
            .status(200)
            .json({ message: `${changes.name} has been updated` })
        } else {
          res
            .status(404)
            .json({ errorMessage: "Can't update a cohort that doesn't exist!" })
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: `Sorry, we had an error updating ${changes.name}`, error })
      })
  } else {
    res
      .status(406)
      .json({ errorMessage: "Cohort name cannot be blank!" })
  }
})

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res
        .status(200)
        .json(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error removing cohort from database!"})
    })
})

module.exports = router;