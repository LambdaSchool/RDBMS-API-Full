const express = require('express');

const db = require('./postController.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  db
    .getPosts()
    .then(posts => {
      if (posts.length > 0) res.status(200).json(posts);
      else res.status(200).json({ message: 'There are no posts to display.' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the posts.' });
    });
});

postRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getPostById(id)
    .then(posts => {
      if (posts.length > 0) res.status(200).json(posts);
      else res.status(200).json({ message: `There is no post with ID ${id}.`})
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving post with ID ${id}.` });
    });
});

postRouter.post('/', (req, res) => {
  const post = req.body;

  if (post.user_id && post.text.length > 0) {
    db
      .postPost(post)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error posting the post.' });
      });
  } else {
    res.status(500).json({ error: 'You must provide a user_id and text.' });
  }
});

postRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (text.length > 0) {
    db
      .putPostById(id, text)
      .then(count => {
        if (count > 0) {
          res.status(201).json({ message: `Post ${id} updated successfully.`});
        } else {
          res.status(200).json({ message: `Post with ID ${id} not found.` });
        }
      })
      .catch(error => {
        res.status(404).json({ error: `The post with ID ${id} does not exist.` });
      });
  } else {
    res.status(404).json({ error: 'You must provide text.' });
  }
});

postRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deletePostById(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Post ${id} deleted successfully.`});
      } else {
        res.status(200).json({ message: `Post with ID ${id} not found.` });
      }
    })
    .catch(error => {
      res.status(404).json({ error: `The post with ID ${id} does not exist.` });
    });
});

module.exports = postRouter;