import express from 'express'
import { getResorts, getResortById } from '../controllers/resortController.js'
const router = express.Router()

router.route('/').get(getResorts)
router.route('/:id').get(getResortById)

export default router