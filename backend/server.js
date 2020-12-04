import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import resortRoutes from './routes/resortRoutes.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/resorts', resortRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`.cyan.underline.bold)) 