const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))


mongoose.connect(
  process.env.DB_URL,
  (err) => err ? console.log(err) : console.log("Connected to the DB")
)

app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']})) // req.auth
app.use('/api/notes', require('./routes/noteRouter'))
app.use('/api/account', require('./routes/authRouter'))
app.use('/api/trails', require('./routes/trailRouter'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(7500, () => {
  console.log(`Server is running on local port 7500`)
})