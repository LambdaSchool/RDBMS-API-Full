const express = require('express');
const stdt = require('./stdtMdl');
const router = express.Router();

router.get('/', (req, res) => {
    stdt
        .findStdt()
        .then(stdt => {
            res.status(200).json(stdt);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    stdt
        .findStdtById(id)
        .then(stdt => {
            res.status(200).json(stdt);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    const stdtidv = req.body;

    stdt
        .addStdt(stdtidv)
        .then(ids => {
            if (!stdtidv.name) {
                res.status(400).send({ error: "Please provide a name for the cohort"})
            }
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    stdt
        .updateStdt(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not update" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    stdt
        .removeStdt(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not remove" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;