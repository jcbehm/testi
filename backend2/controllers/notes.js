const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

/*const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}*/

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user

  const time = new Date().getTime()
  const note = new Note({
    content: body.content,
    //important: body.important === undefined ? false : body.important,
    important: body.important || false,
    date: time,
    votes: body.votes || 0,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

/*notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const time = new Date().getTime()
  const note = new Note({
    content: body.content,
    important: body.important || false,
    //id: generateId(),
    date: time,
    votes: body.votes || 0,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)*/

/*  note
    .save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))*/
//})

notesRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const note = await Note.findById(request.params.id)

  if (note.user.toString() === decodedToken.id.toString()) {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()

    user.notes = user.notes.concat(request.params.id)
    await user.save()
  } else {
    response.status(401).json({ error: 'deleting note not allowed for others than creator of the note' })
  }
})

/*notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})*/

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important, votes } = request.body

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important, votes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedNote)
  /*Note
    .findByIdAndUpdate(
      request.params.id,
      { content, important, votes },
      { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))*/
})

module.exports = notesRouter
