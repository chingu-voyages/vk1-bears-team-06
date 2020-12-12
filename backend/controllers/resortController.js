import expressAsyncHandler from 'express-async-handler'
import Resort from '../models/resortModel.js'

// @description   Fetch all resorts
// @route         GET /api/resorts
// @access        Public
const getResorts = expressAsyncHandler(async (req, res) => {
    const resorts = await Resort.find({})
    res.json(resorts)
})


// @description   Fetch a single resort
// @route         GET /api/resorts/:id
// @access        Public
const getResortById = expressAsyncHandler(async (req, res) => {
    const resort = await Resort.findById(req.params.id)
    
    if(resort){ 
        res.json(resort) 
    } else {
        res.status(404)
        throw new Error('Resort not found')
    }
})


// @description   Delete a resort
// @route         DELETE /api/resorts/:id
// @access        Private/Admin
const deleteResort = expressAsyncHandler(async (req, res) => {
    const resort = await Resort.findById(req.params.id)
    
    if(resort){ 
        await resort.remove()
        res.json({ message: 'Resort removed!' })
    } else {
        res.status(404)
        throw new Error('Resort not found')
    }
})


export { getResorts, getResortById, deleteResort } 