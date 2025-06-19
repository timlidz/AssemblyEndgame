import { languages } from "./languages"

function App() {
  

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
    </>
  )
}

export default App
