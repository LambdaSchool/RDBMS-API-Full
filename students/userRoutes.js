const knex=require('knex');
const dbConfig=require('../knexfile');
const db=knex(dbConfig.development);
const express=require('express');
const router=express.Router();

router.post('/',(req,res)=>{
    const student=req.body;
    student.name && student.cohort_id
    ?
    db
        .insert(student)
        .into('students')
        .then(id=>res.status(201).json(id))
        .catch(err=>res.status(500).json(err))
    :
    null;
})
router.get('/',(req,res)=>{
    db('students')
        .then(students=>res.status(200).json(students))
        .catch(err=>res.status(500).json(err));
})
router.get('/:id',(req,res)=>{
    db('students')
        .join('cohorts',{'cohorts.id':'students.cohort_id'})
        .select('students.id','students.name','cohorts.name as cohort')
        .where({'students.id':req.params.id})
        .then(row=>res.status(200).json(row))
        .catch(err=>res.status(500).json(err));
})
router.delete('/:id',(req,res)=>{
    db('students')
        .where({'id':req.params.id})
        .del()
        .then(count=>res.status(200).json(count))
        .catch(err=>res.status(500).json(err));
})
router.put('/:id',(req,res)=>{
    const student=req.body;
    student.name && student.cohort_id?
    db('students')
        .where({'id':req.params.id})
        .update(student)
        .then(count=>res.status(200).json(count))
        .catch(err=>res.status(500).json(err)):
    null;
})

module.exports=router;