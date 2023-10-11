const notesHelper = require('../utils/notes_helper')

test('dummy returns one', () => {
  const notes = []

  const result = notesHelper.dummy(notes)
  expect(result).toBe(1)
})

const listWithOneNote = [
  {
    content: 'HTML is Easy',
    important: true,
    votes: 1,
    id: '64e7804121bdfc2d3dffc220'
  },
]

const listWithThreeNotes = [
  {
    content: 'HTML is Easy',
    important: true,
    votes: 1,
    id: '64e7804121bdfc2d3dffc220'
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
    votes: 5,
    id: '64e780bb0d44b4bd2c0bc151'
  },
  {
    content: 'Browser can execute only JavaScript',
    important: false,
    votes: 0,
    id: '64e78096ce64b7279eea7b40'
  }
]

describe('total votes', () => {
  test('when list has only one note equals the votes of that', () => {
    const result = notesHelper.totalVotes(listWithOneNote)
    expect(result).toBe(1)
  })

  test('when list has three notes equals the likes of those', () => {
    const result = notesHelper.totalVotes(listWithThreeNotes)
    expect(result).toBe(6)
  })

  test('when list has no notes equals zero', () => {
    const result = notesHelper.totalVotes([])
    expect(result).toBe(0)
  })
})

describe('favorite note', () => {
  test('when list has only one blog equals to that blog', () => {
    const result = notesHelper.favoriteNote(listWithOneNote)
    const expected = {
      content: 'HTML is Easy',
      important: true,
      votes: 1,
      id: '64e7804121bdfc2d3dffc220'
    }
    expect(result).toEqual(expected)
  })

  test('when list has many blogs equals to the one with most likes', () => {
    const result = notesHelper.favoriteNote(listWithThreeNotes)
    const expected = {
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true,
      votes: 5,
      id: '64e780bb0d44b4bd2c0bc151'
    }
    expect(result).toEqual(expected)
  })
})