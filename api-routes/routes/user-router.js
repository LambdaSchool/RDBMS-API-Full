const express = require('express')

const db = require('../../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('users')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching users...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
    db('users')
    .where('id', Number(req.params.id)).first()
    .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual user...')
    console.log(error.message)
  })
})

router.post('/', (req, res) => {
  let { name } = req.body;
  let user = {
    name
  }
  db('users')
  .insert(user)
  .then(ids => ({ id: ids[0] }),
  res.status(200).json(user))
  .catch(error => {
      res.status(404).send('error adding user account...')
      console.log(error.message)
    })
  })

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db('users')
  .where('id', id)
  .del()
  .then(response => {
    res.status(200).json("The user was deleted successfully");
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the user could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let { name } = req.body;
  let changes = {
    name
  }
  db('users')
  .where('id', id)
  .update(changes)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update user information...')
  })
})

module.exports = router;
