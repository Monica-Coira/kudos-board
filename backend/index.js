const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const boardRoutes = require('./routes/BoardRoutes')
const cardRoutes = require('./routes/CardRoutes')

app.use(express.json())
app.use(cors())
app.use('/boards', boardRoutes)
app.use('/cards', cardRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})