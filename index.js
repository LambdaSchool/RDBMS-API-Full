const express = require('express');
const server = express();

const knex = require('knex');
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
const PORT = process.env.PORT || 3400;

server.use(express.json());

//GET

server.get('/cohorts', (req, res) => {

});

server.get('/cohorts/:id', (req, res) => {

});

server.get('/cohorts/:id/students', (req, res) => {

});


server.get('/students', (req, res) => {

});

server.get('/students/:id', (req, res) => {

});

//POST

server.post('/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then()
        .catch(err => {
            res.status(500).json({message: "Unable to add student"})
        })
});

server.post('/students', (req, res) => {
    const student = req.body;
    db('students').insert(student)
        .then()
        .catch(err => {
            res.status(500).json({message: "Unable to add student"})
        })
});


//PUT

server.put('/cohorts/:id', (req, res) => {

});

server.put('/students/:id', (req, res) => {

});


//DELETE

server.delete('/cohorts/:id', (req, res) => {

});


server.delete('/students/:id', (req, res) => {

});


//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});
