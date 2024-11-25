const express = require('express');

const router = express.Router();

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//GET

router.get('/', (req, res) => {
    db('students')
        .then(response => res.json(response))
        .catch(err => {res.status(500).json({ message: "Unable to fetch students" })})
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('students').where('id', id)
        .then(student => {
            if(Object.keys(student).length === 0){
                res.status(404).json({message: "Invalid student ID"})
            } else {
                res.json(student)
            }
        })
});

//POST

router.post('/', (req, res) => {
    const student = req.body;
    db('students').insert(student)
        .then()
        .catch(err => {
            res.status(500).json({message: "Unable to add student"})
        })
});


//PUT

router.put('/:id', (req, res) => {

});


//DELETE

router.delete('/:id', (req, res) => {

});

module.exports = router;