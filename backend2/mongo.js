const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack2023-2024.oriihy1.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  votes: Number,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length < 4) {
  console.log('Showing all the notes currently in the database: ')

  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const contentParameter = process.argv[3]
  const note = new Note({
    content: contentParameter,
    important: false,
    votes: 0,
  })

  note.save().then(result => {
    console.log('Following note was saved: ' + note)
    mongoose.connection.close()
  })
}
