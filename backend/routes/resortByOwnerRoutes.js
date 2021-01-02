import express from 'express'
import { 
    getResortOwnerById,
    updateResortOwner,
    getOwnerResorts,
    createOwnerResort,
    deleteResortOwner
} from '../controllers/resortController.js'

import { protect, resortOwner } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/:userid').get(getOwnerResorts, resortOwner).post(protect, resortOwner, createOwnerResort)
router.route('/:userid/:id').get(getResortOwnerById).post(protect, resortOwner, updateResortOwner).delete(protect, resortOwner, deleteResortOwner)

export default router