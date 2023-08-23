import { useState, useEffect } from 'react'

import './App.css';

import Menu from './components/Menu'
import Greetings from './components/Greetings'
import Counter from './components/Counter'
import NoteList from './components/NoteList'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Credits from './components/Credits'

import noteService from './services/notes'

const App = () => {
  const [ menu, setMenu ] = useState("menu")
  const [ counter, setCounter ] = useState(0)
  const [ memory, setMemory ] = useState(0)
  const [allClicks, setAll] = useState([])
  const [important, setImportant] = useState(true)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => {
        console.log('Fail. Error:', error)
        
      })
    }, [])
    console.log('render', notes.length, 'notes')

  const results = notes.filter(note =>
    note.content.toLowerCase().includes(search.toLowerCase())
  )

  const changeMenu = (newMenuState) => () => {
    if (menu === newMenuState) setMenu("menu")
    else setMenu(newMenuState)
  } 

  const setToValue = (newValue) => () => {
    if (newValue === 0) {setAll(allClicks.concat('0'))}
    else if (newValue > counter) {setAll(allClicks.concat('+'))}
    else if (newValue < counter) {setAll(allClicks.concat('-'))}
    setCounter(newValue)
  }
  const save = () => {
    setMemory(counter)
    setAll(allClicks.concat('s'))
  }
  const toggleImportant = () => setImportant(!important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (newNote=== "") {
      setErrorMessage(`
        No eehän sitä nyt passaa tyhjee lisätä turhan päeten. Kokkeileppa ihan kirjottaa päykäyttää jottainnii.
      `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      /*
      window.alert(`
        No eehän sitä nyt passaa tyhjee lisätä turhan päeten. Kokkeileppa ihan kirjottaa päykäyttää jottainnii.
      `)*/
      setNewNote('')
    }
    else if (notes.find(note => note.content === newNote)) {
      setErrorMessage(`
        Vae että "${newNote}"? No semmottiinhan tuolla jo taetaapi olla. Mietippä kuule vielä uuvestaan!
      `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      setNewNote('')
    }
    else {
      const noteObject = {
      content: newNote,
      important: true //Math.random() > 0.618
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(
          note => note.id !== id ? note : returnedNote
        ))
      })
      .catch(error => {
        setErrorMessage(`
          Voe tokkiisa! '${note.content}', eehän sitä tuommosta tietoa palavelimelta löyvy alakuunkaa.
        `)
        setTimeout(() => {
          setErrorMessage(null)
        }, 10000)
        /*alert(
          `Voe tokkiisa! '${note.content}', eehän sitä tuommosta tietoa palavelimelta löyvy alakuunkaa.`
        )*/
        setNotes(notes.filter(n => n.id !== id))
        console.log(error)
        
      })
  }  

  const eraseNote = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .erase(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.filter(
          note => note.id !== id
        ))
      })
      .catch(error => {
        alert(
          `Voe tokkiisa! '${note.content}', sehän näyttääpi että joku ehti ensin.`
        )
        setNotes(notes.filter(n => n.id !== id))
        console.log('Virhe:', error)
      })
  }  

  const boss = {
    name: 'Morticia',
    age: 89
  }
  console.log('Hauska tutustua, selaimen konsoli. Minä olen React-komponentti.')
  // console.log('rendering...', counter, memory, newNote)

  if (menu === "menu") {
    return (
      <div className="App">
        <Menu changeMenu={changeMenu}/>
        <Notification message={errorMessage} />
      </div>
    )
  }

  if (menu === "greetings") {
    return (
      <div className="App">
        <Menu changeMenu={changeMenu}/>
        <Notification message={errorMessage} />
        <Greetings boss={boss}/>
        <Footer />
      </div>
    )
  }

  if (menu === "counter") {
    return (
      <div className="App">
        <Menu changeMenu={changeMenu}/>
        <Notification message={errorMessage} />
        <Counter
          counter={counter}
          setToValue={setToValue}
          save={save} memory={memory}
          allClicks={allClicks}
        />
        <Footer />
      </div>
    )
  }

  if (menu === "notes") {
    return (
      <div className="App">
        <Menu changeMenu={changeMenu}/>
        <Notification message={errorMessage} />
        <NoteList
          notes={results}
          important={important}
          toggleImportant={toggleImportant}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
          addNote={addNote}
          search={search}
          handleSearchChange={handleSearchChange}
          toggleImportanceOf={toggleImportanceOf}
          erase={eraseNote}
        />
        <Footer />
      </div>
    )
  }

  if (menu === "credits") {
    return (
      <div className="App">
        <Menu changeMenu={changeMenu}/>
        <Notification message={errorMessage} />
        <Credits/>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="App">

      ???
      
    </div>
  )
}



/*
import React from 'react'
import ReactDOM from 'react-dom'

// Sub-components

const Part = (props) => ( <p> {props.part}: {props.exercises} exercises</p> )

// Main components

const Header = (props) =>  ( <h1>{props.course}</h1> )

const Content = (props) => (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )

const Total = (props) => (
    <p>
      Total number of exercises: {props.parts[0].exercises + props.parts[1].exercises
        + props.parts[2].exercises}
    </p>
  )

// The App

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>

      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />

    </div>
  )
}
*/
export default App
