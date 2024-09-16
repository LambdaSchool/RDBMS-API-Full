const express = require('express');

const db = require('./tagController.js');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
  db
    .getTags()
    .then(tags => {
      if (tags.length > 0) res.status(200).json(tags);
      else res.status(200).json({ message: 'There are no tags to display.' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the tags.' });
    });
});

tagRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getTagById(id)
    .then(tags => {
      if (tags.length > 0) res.status(200).json(tags);
      else res.status(200).json({ message: `There is no tag with ID ${id}.` });
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving tag with ID ${id}.` });
    });
});

tagRouter.post('/', (req, res) => {
  const tag = req.body;
console.log(tag);
  if (tag.tag.length > 0) {
    db
      .postTag(tag)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error posting the tag.' });
      });
  } else {
    res.status(500).json({ error: 'You must provide a tag.' });
  }
});

tagRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  if (tag.length > 0) {
    db
      .putTagById(id, tag)
      .then(count => {
        if (count > 0) {
          res.status(201).json({ message: `Tag ${id} updated successfully.`});
        } else {
          res.status(404).json({ message: `Tag with ID ${id} not found.` });
        }
      })
      .catch(error => {
        res.status(404).json({ error: `The tag with ID ${id} does not exist.` });
      });
  } else {
    res.status(500).json({ error: 'You must provide a tag.' });
  };
});

tagRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deleteTagById(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Tag ${id} deleted successfully.`});
      } else {
        res.status(404).json({ message: `Tag with ID ${id} not found.` });
      }
    })
    .catch(error => {
      res.status(404).json({ error: `The tag with ID ${id} does not exist.` });
    });
});

module.exports = tagRouter;