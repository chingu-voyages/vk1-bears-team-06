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

router.route('/').get(getOwnerResorts, resortOwner).get(getResorts, admin).post(protect, resortOwner, admin, createResort)
router.route('/:id/reviews').post(protect, createResortReview)
router.get('/top', getTopResorts)
router.route('/:id').get(getResortById).delete(protect, resortOwner, admin, deleteResort)
.put(protect, admin, resortOwner, updateResort)

export default router