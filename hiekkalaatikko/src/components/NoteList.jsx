const Button = ({ handleClick, text }) => (
  <button className="notesButton" onClick={handleClick}>
    {text}
  </button>
)

const SimpleNote = ({ note }) => <li>{note.content}</li>

const Note = ({ note, toggleImportance, erase, vote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content} &#40;{note.votes} votes&#41;
      <br />
      <button className="noteButton" onClick={toggleImportance}>{label}</button>
      <button className="noteButton" onClick={erase}>delete</button>
      <button className="noteButton" onClick={vote}>vote</button>
    </li>
  )
}

const NoteList = ({
  notes, important, toggleImportant, newNote, handleNoteChange,
  addNote, search, handleSearchChange, toggleImportanceOf, erase, vote
} ) => {
  const totalVotes = (notes) => notes.reduce((sum, note) => sum + note.votes, 0)

  if (!important) {
    return (
      <div className="notes">
        <h2>Notes</h2>
        <Button className="notesButton" handleClick={toggleImportant} text='important only'/>
        <br />
        <br />
        search: 
        <input
          value={search}
          onChange={handleSearchChange}
        />
        <ul>
          {notes.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              erase={() => erase(note.id)}
              vote={() => vote(note.id)}
            />
          )}
        </ul>
        {totalVotes(notes)} votes in total.
        <br />
        <br />
        <form onSubmit={addNote}>
          add a new note: 
          <input
            value={newNote}
            onChange={handleNoteChange}
          />
          <button className="notesButton" type="submit">add</button>
        </form>  
      </div>
    )
  }
  else {
    const filtered = notes.filter(note => note.important)
    return (
      <div className="notes">
        <h2>Notes</h2>
        <Button className="notesButton" handleClick={toggleImportant} text='show all'/>
        <ul>
          {filtered.map(note =>
            <SimpleNote key={note.id} note={note} />
          )}
        </ul>
      </div>
    )
  }
}
  
  export default NoteList
  