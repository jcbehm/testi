const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: -1,
    votes: 0
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    date: -1,
    votes: 0
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  //await note.remove()
  await Note.deleteOne({ _id: note._id })

  return note._id.toString()
  //return '65007aaf5fa2f1703e691e78'
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
}
