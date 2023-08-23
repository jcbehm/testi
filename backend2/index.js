const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const time = new Date().toString()
    response.send('<h2>Notes server</h2>There are ' + notes.length + ' notes in the server.<br />' + time)
})
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
    // console.log('headers:', request.headers)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/notes', (request, response) => {
    const body = request.body
    console.log('POST request body:  ', body)
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
    
    notes = notes.concat(note)
  
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
  
const PORT = process.env.PORT || 5171
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
