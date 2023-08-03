import './App.css';

const Hello = (props) => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log("Muuttujat: ", now, a+b)
  console.log("Parametrit: ", props)
  return (
    <div>
      <br />
      <p>Hei {props.name}, nyt on {now.toString()} ja sinä olet {props.age}-vuotias</p>
      <p>
        {a} plus {b} on {a + b}
      </p>
    </div>
  )
}

const App = () => {
  const boss = {
    name: 'Morticia',
    age: 89
  }
  console.log('Hauska tutustua, selaimen konsoli. Minä olen React-komponentti.')
  return (
    <div className="App">
      <header className="App-header">
        Terveisiä React-maailmasta!
      </header>
      <p>Heipähei, hyvää iltaa.</p>
      <Hello name="Eevertti" age={29+4}/>
      <Hello name="Pulmu-Ulpu" age={3*5-6}/>
      <Hello name={boss.name} age={boss.age} />
    </div>
  )
}
export default App
