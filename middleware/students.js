const express = require('express');
const router = express.Router();
const db = require('../helpers/studentHelpers');

router.post('/', (req, res) => {
  const student = req.body;
  if(student.name.length !== 0) {
    db.insert(student)
      .then(student => {
        res
          .status(201)
          .json(student.id)
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was a problem adding that student to the database...", error})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please give the student a name!" })
  }
})

router.get('/', (req, res) => {
  db.find()
    .then(students => {
      res
        .status(200)
        .json(students)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble fetching the list of students.", err })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(student => {
      if (student.length !== 0) {
        res
          .status(200)
          .json(student)
      } else {
        res
          .status(404)
          .json({ errorMessage: "There is no student with that ID number in this database." })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Sorry, we are having trouble finding that student...", error})
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
            .json({ message: `The record for ${changes.name} has been updated` })
        } else {
          res
            .status(404)
            .json({ errorMessage: "Can't update a student that doesn't exist!" })
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
      .json({ errorMessage: "student name cannot be blank!" })
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
        .json({ errorMessage: "Error removing student from database!"})
    })
})

module.exports = router;