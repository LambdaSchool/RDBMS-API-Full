const express = require('express');
const chrt = require('./chrtMdl');
const router = express.Router();

router.get('/', (req, res) => {
    chrt
        .findChrt()
        .then(chrt => {
            res.status(200).json(chrt);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    chrt
        .findChrtById(id)
        .then(chrt => {
            res.status(200).json(chrt);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id/stdt', (req, res) => {
    const { id } = req.params;
    chrt
        .findChrtStdt(id)
        .then(stdt => {
            if (!stdt) {
                return res.status(404).send({ message: "The students within the specified cohort are unavailable." });
            }
            res.status(200).json(stdt);
        })
        .catch(err => {
            res.status(500).send({ error: "The students information could not be retrieved." });
        });
});

router.post('/', (req, res) => {
    const chrtidv = req.body;

    chrt
        .addChrt(chrtidv)
        .then(ids => {
            if (!chrtidv.name) {
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

    chrt
        .updateChrt(id, changes)
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

    chrt
        .removeChrt(id)
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