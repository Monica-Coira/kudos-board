const express = require('express')
const app = express()
const PORT = 5432

const routes = require('./routes/BoardRoutes')

app.use(express.json())
app.use('/boards', routes)

app.get('/', (req, res) => {
    res.send('Welcome to my home page!')
})

app.get('/cards', (req, res) => {
    res.send('Cards page')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})