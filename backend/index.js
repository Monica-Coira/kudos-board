const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/BoardRoutes')

app.use(express.json())
app.use('/boards', routes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})