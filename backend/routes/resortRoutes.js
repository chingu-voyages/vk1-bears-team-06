import express from 'express'
import { 
    getResorts, 
    getResortById, 
    getResortOwnerById,
    deleteResort, 
    createResort, 
    updateResort,
    updateResortOwner,
    createResortReview,
    getTopResorts,
    getOwnerResorts,
    createOwnerResort,
    deleteResortOwner,
} from '../controllers/resortController.js'

import { protect, admin, resortOwner } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getResorts, admin).post(protect, admin, createResort)
router.route('/:id/reviews').post(protect, createResortReview)
router.get('/topresort/top', getTopResorts)
router.route('/:id').get(getResortById).delete(protect, admin, deleteResort)
.put(protect, admin, updateResort)

export default router