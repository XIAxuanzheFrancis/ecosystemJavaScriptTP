const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const routers = require('./index')
app.use(`/${process.env.SUBJECT}`, routers)

const PORT = process.env.BACKEND_PORT
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})