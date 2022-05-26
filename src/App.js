import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  {"src": "/img/1.png", matched: false},
  {"src": "/img/2.png", matched: false},
  {"src": "/img/3.png", matched: false},
  {"src": "/img/4.png", matched: false},
  {"src": "/img/5.png", matched: false},
  {"src": "/img/6.png", matched: false}
]


export default function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards, gives random id and duplicates
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
  }

  
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare cards
  useEffect(() =>{
    if(choiceOne != null && choiceTwo != null){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        
        setTimeout(() => resetTurn(), 1000)}
    }
  }, [choiceOne, choiceTwo])

  //info alert

  const introAlert = () => {
    alert(
      `
      Welcome to my game!
      The rules are simple:
      When you click on a card it shows you the face and you can 
      select another card.
      If they match you got a pair if they don't they go face down 
      again.
      Your goal is to get all the pairs face up in the least amount of 
      turns possible!
      GLHF`
      )
  }


  // reset choices and adds a turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  
  // start game auto

  useEffect(() => {
    shuffleCards()
    introAlert()
  },[])


  return (
    <div id='main'>
      <h1>Match the cards!</h1>
      <p>Turns: {turns}</p>
      <div className='button-grid'>
      <button onClick={shuffleCards}>New Game</button>
      <button onClick={introAlert}>Help Me!</button>
      </div>
      <div className='card-grid'>
        {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled ={disabled}
            />
        ))}
      </div>
          
    </div>
  )
}
