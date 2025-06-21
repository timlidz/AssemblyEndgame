import { languages } from "./languages"
import React from "react"
import { clsx } from 'clsx';


function App() {
  const [word, setWord] = React.useState("react")
  const [letters, setLetters] = React.useState([])

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function guessLetters(letter){
    setLetters(prev => prev.includes(letter) ? prev : 
    [...prev, letter] )
  }

  function buttonColors(letter) {
    const classVar = [...word].includes(letter) ? 'key-correct' : 'key-wrong'
    return classVar
  }

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
        {[...alphabet].map(el => {
          const isGuessed = letters.includes(el)
          const isCorrect = isGuessed && word.includes(el)
          const isWrong = isGuessed && !word.includes(el)
          const className = clsx({'key-correct':isCorrect, 'key-wrong':isWrong})
          return (
            <button className={className}
            onClick={() => guessLetters(el)} key={el} id={el}>{el.toUpperCase()}</button>
          )}
        )}
      </section>
      <button className="new-game">New Game</button>
    </>
  )
}

export default App
