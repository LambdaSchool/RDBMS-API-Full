const express = require('express');
const router = express.Router();
 const db = require('../data/helpers/studentModel');
 // error helper
const errorHelper = (res, code, errMessage, err = 'ERROR') => {
  return res.status(code).json({ message: errMessage, err });
}
 // Endpoints
 // GET all students
router.get('/', (_, res) => {
  db.get()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => errorHelper(res, 500, 'Error fetching', err));
});
 // GET student by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
   db.get(id)
    .then(student => {
      // student returns undefined || object
      if (!student) return errorHelper(res, 404, `ID: ${id} Not Found`);
      res.status(200).json(student);
    })
    .catch(err => errorHelper(res, 500, 'Error fetching', err));
});
 // POST a new student
router.post('/', (req, res) => {
  const name = req.body;
   db.insert(name)
    .then(id => {
      res.status(201).json({ message: `Student with id ${id} added` });
    })
    .catch(err => errorHelper(res, 500, 'Error Posting', err));
});
 // UPDATE existing student
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;
   db.update(id, name)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} student updated` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, 'Error Updating', err));
});
 // DELETE existing student
router.delete('/:id', (req, res) => {
  const { id } = req.params;
   db.remove(id)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} student deleted` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, 'Error Deleting', err));
});
 module.exports = router;