const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

/*const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
*/

const Note = require('./models/note')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const time = new Date().toString()
  Note.find({}).then(notes => {
    const amount = notes.length
    response.send(`
      <h2>Notes server (${config.version})</h2>
      There are ${amount} notes in the server. <br />
      ${time}
    `)
  })
})

app.use(middleware.tokenExtractor)

app.use('/api/notes', middleware.userExtractor, notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(middleware.errorHandler)

module.exports = app

/*
//const PORT = process.env.PORT || 5171
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/
