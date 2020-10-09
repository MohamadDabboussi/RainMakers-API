const cors =require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(cors())

mongoose.connect('mongodb://localhost/Rainmakers', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const rainmakerRouter = require('./routes/api')
app.use('/rainmaker', rainmakerRouter)

app.listen(3000, () => console.log('Server Started'))