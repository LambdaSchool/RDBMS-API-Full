const express = require('express')

const db = require('../../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('posts')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching posts...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db('posts')
  .where('id', Number(req.params.id)).first()
  .then(response => {
  res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual post...')
    console.log(error.message)
  })
})


router.post('/', (req, res) => {
  let { userId, text } = req.body;
  let post = {
    userId,
    text
  }
  db('posts')
  .insert(post)
  .then(ids => ({ id: ids[0] }),
  res.status(200).json(post))
    .catch(error => {
      res.status(404).send('error adding post...')
      console.log(error.message)
    })
  })

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db('posts')
  .where('id', id)
  .del()
  .then(response => {
    res.status(200).json('The post was deleted successfully');
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the post could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let { userId, text } = req.body;
  let changes = {
    userId,
    text
  }
  db('posts')
  .where('id', id)
  .update(changes)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update the post...')
  })
})

module.exports = router;
