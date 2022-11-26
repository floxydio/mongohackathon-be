const express = require('express')
const bodyParser = require('body-parser')
const { init } = require('./database/db')
const routes = require('./route/routes')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

init().then(() => {
  console.log('starting server on port 3000')
  app.listen(3000)
})
