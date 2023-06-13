const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log('Connected to the DB')
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']})) // req.auth
app.use('/api/notes', require('./routes/noteRouter'))
app.use('/api/trails', require('./routes/trailRouter'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

connectDB().then(() => {
  app.listen(7500, () => {
    console.log(`Server is running on local port 7500`)
  })
})