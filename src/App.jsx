import { languages } from "./languages"
import React from "react"
import { clsx } from 'clsx';


function App() {
  // State values
  const [word, setWord] = React.useState("react")
  const [letters, setLetters] = React.useState([])

  //derived values
  const wrongGuessCount = letters.reduce((acc, curr) => 
    word.includes(curr) ? acc+0 : acc+1, 0)
  const isGameOver = wrongGuessCount >= languages.length-1

  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function guessLetters(letter){
    setLetters(prev => prev.includes(letter) ? prev : 
    [...prev, letter] )
  }


  const wordDisplay = [...word].map((el, index) => 
  <span key={index}>{letters.includes(el) ? el.toUpperCase() : ""}</span> )


  const keyboardElements = 
    [...alphabet].map(el => {
    const isGuessed = letters.includes(el)
    const isCorrect = isGuessed && word.includes(el)
    const isWrong = isGuessed && !word.includes(el)
    const className = clsx({'key-correct':isCorrect, 'key-wrong':isWrong})
    return (
      <button className={className}
      onClick={() => guessLetters(el)} key={el} id={el}>{el.toUpperCase()}</button>
    )}
  )


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
          {languages.map((el, index) => <p className={index < wrongGuessCount ? 'lost' : ""} style={{color: el.color, backgroundColor: el.backgroundColor}} key={el.name}>{el.name}</p>)}
      </section>
      <section className="word">
        {wordDisplay}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </>
  )
}

export default App
