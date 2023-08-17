import Button from './Button'

const Menu = ({ changeMenu }) => {
    return (
        <div id="menu">
            <header className="App-header">
                Terveisiä React-maailmasta!
            </header>
            <Button handleClick={changeMenu('greetings')} text='tervehdys'/>
            <Button handleClick={changeMenu('counter')} text='laskuri'/>
            <Button handleClick={changeMenu('notes')} text='päivyri'/>
            <Button handleClick={changeMenu('credits')} text='tekniikka'/>
      </div>
    )
}

export default Menu
