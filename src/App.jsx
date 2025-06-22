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

  const isGameWon = 
  word.split("").every(el => letters.includes(el))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost

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

  function statusUpdate() {
    if (isGameWon) {
      return <div className="status-won">
                <h2>You Win!</h2>
                <p>Well done 🎉</p> 
              </div>
    }
    if (isGameLost) {
      return <div className="status-lost">
                <h2>Game Over!</h2>
                <p>Better start learning Assembly</p> 
              </div>
    }
    return <div className="status">
            </div>
      
  }


  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      {statusUpdate()}
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
