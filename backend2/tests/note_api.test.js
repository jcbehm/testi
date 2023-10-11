const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haSIsImlkIjoiNjUxMmQ5MzFiMGI1M2ZiNWNmMTRkZGVjIiwiaWF0IjoxNjk1NzQyNDA2LCJleHAiOjE2OTU3NDYwMDZ9.pDkuGcaMvcUsqGRvpiJXTqo3uHQZCQrjYtnC1eMlKc0' )
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
      )

      const contents = notesAtEnd.map(r => r.content)

      expect(contents).not.toContain(noteToDelete.content)
    })
  })

  test('note added without votes has zero votes', async () => {
    const newNote = {
      content: 'this note has no information about votes when added',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    let returnedNote = null
    notesAtEnd.forEach(note => {
      if (note.content === 'this note has no information about votes when added') {
        returnedNote = note
      }
    })
    // ^ MIKSI tämä sama juttu ei toimi Find:lla? En voi ymmärtää. Pää hajoaa jos yrittää miettiä järjellä.
    expect(returnedNote.votes).toEqual(0)
  })
})

describe('updating a note', () => {
  test('succeeds with valid data', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToVote = notesAtStart[0]

    await api
      .put(`/api/notes/${noteToVote.id}`)
      .send({ votes: 1 })
      .expect(200)

    const notesAtEnd = await helper.notesInDb()

    /*expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length
    )*/

    expect(notesAtEnd[0].votes).toEqual(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})