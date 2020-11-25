const express = require('express')
const resorts = require('./data/resorts')

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


app.listen(5000, console.log('Server running on port 5000')) 