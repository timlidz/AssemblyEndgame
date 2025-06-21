import { languages } from "./languages"
import React from "react"


function App() {
  const [word, setWord] = React.useState("react")

  const alphabet = "abcdefghijklmnopqrstuvwxyz"


  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <div className="status">
        <h2>You Win!</h2>
        <p>Well done 🎉</p>
      </div>
      <section className="languages">
          {languages.map(el => <p style={{color: el.color, backgroundColor: el.backgroundColor}} key={el.name}>{el.name}</p>)}
      </section>
      <section className="word">
        {word.split('').map((el, index) => <span key={index}>{el.toUpperCase()}</span>)}
      </section>
      <section className="keyboard">
        {[...alphabet].map(el => <button key={el}>{el.toUpperCase()}</button>)}
      </section>
    </>
  )
}

export default App
