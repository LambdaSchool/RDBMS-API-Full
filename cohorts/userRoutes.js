const knex=require('knex');
const dbConfig=require('../knexfile');
const db=knex(dbConfig.development);
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    db('cohorts')
        .then(cohorts=>res.status(200).json(cohorts))
        .catch(err=>res.status(500).json(err));
})
router.get('/:id',(req,res)=>{
    db('cohorts')
        .where({'id':req.params.id})
        .then(row=>res.status(200).json(row))
        .catch(err=>res.status(500).json(err));
})
router.get('/:id/students',(req,res)=>{
    db('students')
        .where({'cohort_id':req.params.id})
        .then(rows=>res.status(200).json(rows))
        .catch(err=>res.status(500).json(err));
})
router.delete('/:id',(req,res)=>{
    db('cohorts')
        .where({'id':req.params.id})
        .del()
        .then(count=>res.status(200).json(count))
        .catch(err=>res.status(500).json(err));
})
router.post('/',(req,res)=>{
    const cohort=req.body;
    db
        .insert(cohort)
        .into('cohorts')
        .then(id=>res.status(201).json(id))
        .catch(err=>res.status(500).json(err));
})
router.put('/:id',(req,res)=>{
    const cohort=req.body;
    cohort.name 
    ?
    db('cohorts')
        .where({'id':req.params.id})
        .update(cohort)
        .then(count=>res.status(200).json(count))
        .catch(err=>res.status(500).json(err))
    :
    null
})
module.exports=router;