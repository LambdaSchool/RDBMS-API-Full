const express = require('express')
const db = require('../data/db')
const router = express.Router()


// ******************************  Error Constants ********************************************

const SUCCESS = 200;
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const INVALID_POST_ID = "INVALID_POST_ID"
const INVALID_USER_ID = "INVALID_USER_ID"
const MISSING_TEXT_OR_ID = "MISSING_TEXT_OR_ID"



// ******************************  MiddleWare ********************************************

// local middleware checks for specific post by ID and adds to req.postIn
// Use to confirm we have a valid post
const getPost = async (req, res, next) => {
    let { id } = req.params
    let error = INVALID_POST_ID
    
    try{
        const postIn = await db.get(id)
        if(!postIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.postIn = postIn  

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}

// Checks for user by ID and adds to req.userIn
// Use to confirm valid user
const getUser = async (req, res, next) => {
    const { userId } = req.body
    const { id } = req.params
    let error = INVALID_USER_ID

    try{
        const userIn = await db.get(userId || id)
        if(!userIn){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        req.userIn = userIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})    }
}


// ******************************  Posts ********************************************

router.get('/', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const posts = await db.get()
        res.status(SUCCESS).json(posts)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

router.get('/:id', getPost, (req,res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.postIn)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

// Get all tags for a post
router.get('/:id/tags', getPost, async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const tags = await db.getPostTags(req.params.id)
        res.status(SUCCESS).json(tags)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

router.post('/', getUser, async (req, res, next) => {
    // getUser has already validated we have a valid user
    const { text, userId } = req.body
    let error = MISSING_TEXT_OR_ID

    try{
        if(!text || !userId){ throw Error() }   // throw if missing information

        const postOut = {...req.body}
        error = INTERNAL_SERVER_ERROR           

        const response = await db.insert(postOut)
        res.status(SUCCESS).json(response)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.put('/:id', getPost, async (req, res, next) => {
    try{
        const updated = {...req.body} 
        await db.update(req.params.id, updated); 
        res.status(SUCCESS).json(updated)
    }catch(err) {
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

router.delete('/:id', getPost, async (req, res, next) => {
    try{
        await postDb.remove(req.params.id)
        res.status(SUCCESS).json({"Removed": req.postIn})
        
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

module.exports = router