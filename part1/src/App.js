import { useState } from 'react'
import './App.css';

const Display = ({ counter }) => <p id="counter">{counter}</p>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
  )

const Hello = ({ name, age }) => {
  const yearNow = new Date().getFullYear()
  //  console.log("Parametrit: ", name, age)
  const bornYear = () => yearNow - age
  return (
    <div>
      <br />
      <p>Hei {name}! Nyt on vuosi {yearNow.toString()} ja sinä olet {age}-vuotias,</p>
      <p>joten todennäköisesti olet syntynyt vuonna {bornYear()}.</p>
    </div>
  )
}

const History = ({ allClicks}) => {
  if (allClicks.length === 0) {
    return ( <p>Klikkaa nappuloita ja katso mitä tapahtuu!</p> )
  }
  if (allClicks.length === 1) {
    return ( <p>Klikkaus: {allClicks.join(' ')}</p> )
  }
  return ( <p>{allClicks.length} klikkausta: {allClicks.join(' ')}</p> )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [ memory, setMemory ] = useState(0)
  const [allClicks, setAll] = useState([])

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

  const boss = {
    name: 'Morticia',
    age: 89
  }
  console.log('Hauska tutustua, selaimen konsoli. Minä olen React-komponentti.')
  console.log('rendering...', counter, memory)
  return (
    <div className="App">
      <header className="App-header">
        Terveisiä React-maailmasta!
      </header>
      <p>Heipähei, hyvää iltaa.</p>
      <Hello name="Pulmu-Ulpu" age={3*5-6}/>
      <Hello name={boss.name} age={boss.age} />
      <br />
      <Display counter={counter}/>
      <Button handleClick={setToValue(counter + 1)} text='ynnää'/>
      <Button handleClick={setToValue(0)} text='tyhjää'/>
      <Button handleClick={setToValue(counter - 1)} text='vähennä'/>
      <Button handleClick={save} text='säilö'/>
      <Display counter={memory}/>

      <History allClicks={allClicks}/>
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
