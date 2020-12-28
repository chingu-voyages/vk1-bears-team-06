import express from 'express'
import { 
    getResorts, 
    getResortById, 
    deleteResort, 
    createResort, 
    updateResort,
    createResortReview,
    getTopResorts,
    getOwnerResorts
} from '../controllers/resortController.js'

import { protect, admin, resortOwner } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getResorts, admin).post(protect, resortOwner, admin, createResort)
router.route('/:userid').get(getOwnerResorts, resortOwner)
router.route('/:id/reviews').post(protect, createResortReview)
router.get('/toprated/top', getTopResorts)
router.route('/:id').get(getResortById).delete(protect, resortOwner, admin, deleteResort)
.put(protect, admin, resortOwner, updateResort)

export default router