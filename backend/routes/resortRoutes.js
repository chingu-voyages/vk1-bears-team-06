import express from 'express'
import { getResorts, getResortById, deleteResort } from '../controllers/resortController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getResorts)
router.route('/:id').get(getResortById).delete(protect, admin, deleteResort)

export default router