const express = require('express')
const dotenv = require('dotenv')
const resorts = require('./data/resorts')

dotenv.config()


const app = express()

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.get('/api/resorts', (req, res) => {
    res.json(resorts)
})

app.get('/api/resorts/:id', (req, res) => {
    const resort = resorts.find(resort => resort._id === req.params.id)
    res.json(resort) 
})


const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`)) 