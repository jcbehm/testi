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

const Greetings = ({ boss }) => {
    return (
        <div>
          <p>Heipähei, hyvää iltaa.</p>
          <Hello name="Pulmu-Ulpu" age={3*5-6}/>
          <Hello name={boss.name} age={boss.age} />
      </div>
    )
}

export default Greetings
