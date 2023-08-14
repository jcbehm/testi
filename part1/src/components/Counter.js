import Button from './Button'

const Display = ({ counter }) => <p id="counter">{counter}</p>

const History = ({ allClicks}) => {
    if (allClicks.length === 0) {
      return ( <p>Klikkaa nappuloita ja katso mitä tapahtuu!</p> )
    }
    if (allClicks.length === 1) {
      return ( <p>Klikkaus: {allClicks.join(' ')}</p> )
    }
    return ( <p>{allClicks.length} klikkausta: {allClicks.join(' ')}</p> )
  }

const Counter = ({ counter, setToValue, save, memory, allClicks }) => {
    return (
        <div>
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

export default Counter
