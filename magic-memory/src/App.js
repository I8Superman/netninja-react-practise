import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // Spread the arr twice to add every ritem twice in the new arr!
      .sort(() => Math.random() - 0.5) // A way to randomize the items in the arr
      .map((card) => ({ ...card, matched: false, id: Math.random() })) // For each card, create obj with same keys + a new id key with random nr

    // setChoiceOne(null)
    // setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // Cannot make compare logic here, as the state might not have updated yet!
  }

  // We need to put logic dependent on state in a useEffect hook
  // Check if 2 choices have been made and compare them
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      }
      setTimeout(() => resetTurn(), 1500)
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h3>Turn: {turns}</h3>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App