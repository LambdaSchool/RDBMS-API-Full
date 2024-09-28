const express = require('express')

const db = require('../../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('tags')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching tags...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db('tags')
  .where('id', Number(req.params.id)).first()
  .then(response => {
  res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual tag...')
    console.log(error.message)
  })
})


router.post('/', (req, res) => {
  db('tags')
  .insert(req.body.tag)
  .then(ids => ({ id: ids[0] }),
  res.status(200).json(req.body.tag))
    .catch(error => {
      res.status(404).send('error adding tag...')
      console.log(error.message)
    })
  })

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db('tags')
  .where('id', id)
  .del()
  .then(response => {
    res.status(200).json('the tag was deleted successfully');
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the tag could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(req.body.tag)
  db('tags')
  .where('id', id)
  .update(changes)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update the tag...')
  })
})

module.exports = router;
