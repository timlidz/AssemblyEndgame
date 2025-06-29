import { languages } from "./languages"
import React from "react"
import { clsx } from 'clsx';
import { getFarewellText, getRandomWord } from "./utils";


function App() {
  // State values
  const [word, setWord] = React.useState(getRandomWord())
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
      disabled={isGameOver}
      aria-disabled={letters.includes(el)}
      aria-label={`Letter ${el}`}
      onClick={() => guessLetters(el)} 
      key={el} 
      id={el}>{el.toUpperCase()}</button>
    )}
  )

  function statusUpdate() {
    if (isGameWon) {
      return <div className="status status-won" aria-live="polite" role="status">
                <h2>You Win!</h2>
                <p>Well done 🎉</p> 
              </div>
    }
    if (isGameLost) {
      console.log(word)
      return <div className="status status-lost" aria-live="polite" role="status">
                <h2>Game Over!</h2>
                <p>Better start learning Assembly 😭</p> 
              </div>
    }
    if (!word.includes(letters.slice(-1))) {
      return <div className="status status-lost-life" aria-live="polite" role="status">
        "{getFarewellText(languages[wrongGuessCount-1].name)}"
      </div>
    }
    return <div className="status" aria-live="polite" role="status">
            </div>  
  }


  return (
    <main>
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

      <section className="sr-only" aria-live="polite" 
                role="status">
          <p>Current word: {word.split("").map(letter => 
                letters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && <button className="new-game">New Game</button>}

    </main>
  )
}

export default App
