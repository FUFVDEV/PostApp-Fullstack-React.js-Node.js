require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const postRoutes = require('./routes/postRoutes')

const app = express()

// App Settings.
app.set('PORT', process.env.PORT) 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded.
app.use(bodyParser.json()) // parse application/json.

app.get('/', (req, res) => res.send('Welcome to PostApp-Server'))

// Post route management.
app.use('/post', postRoutes)

// 404 Error handler.
app.use((req, res,) => {
    res.status(404).send('404: Page Not Found')
})

app.listen(app.get('PORT'), (error) => {
    if (error) console.log("Error(listen):", error) 
    console.log(`>>> Server on port ${process.env.PORT}`)
})
