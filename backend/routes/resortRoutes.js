import express from 'express'
import { 
    getResorts, 
    getResortById, 
    deleteResort, 
    createResort, 
    updateResort 
} from '../controllers/resortController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getResorts).post(protect, admin, createResort)
router.route('/:id').get(getResortById).delete(protect, admin, deleteResort)
.put(protect, admin, updateResort)

export default router