import express from 'express'
import expressAsyncHandler from 'express-async-handler'

const router = express.Router()

import Resort from '../models/resortModel.js'

// @description   Fetch all resorts
// @route         GET /api/resorts
// @access        Public
router.get('/', expressAsyncHandler (async (req, res) => {
    const resorts = await Resort.find({})
    res.json(resorts)
}))


// @description   Fetch a single resort
// @route         GET /api/resorts/:id
// @access        Public
router.get('/:id', expressAsyncHandler (async (req, res) => {
    const resort = await Resort.findById(req.params.id)
    
    if(resort){ 
        res.json(resort) 
    } else {
        res.status(404)
        throw new Error('Resort not found')
    }
}))

export default router