const dummy = (notes) => {
  //const Note = require('../models/note')
  return 1
}

const totalVotes = (notes) => {
  const totalVotes =  notes.reduce((sum, note) => sum + note.votes, 0)
  return totalVotes
}

const favoriteNote = (notes) => {
  //let favorite = { title: '', author: '', likes: -1 }
  let favorite = { votes: -1 }
  notes.forEach(note => {
    if (favorite.votes < note.votes) {
      favorite = { ...note }
    }
  })
  /*
  const returningFavorite = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }*/
  return favorite
}

module.exports = {
  dummy, totalVotes, favoriteNote
}
