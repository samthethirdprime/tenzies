import Die from "../components/Die.jsx"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import "./index.css"


export default function App() {


    /**
     * Challenge:
     * Make it so when the game is over, the "New Game" button
     * automatically receives keyboard focus so keyboard users
     * can easily trigger that button without having to tab
     * through all the dice first.
     *
     * Hints:
     * 1. Focusing a DOM element with the DOMNode.focus() method
     *    requires accessing the native DOM node. What tool have
     *    we learned about that allows us to do that?
     *
     * 2. Automatically calling the .focus() on a DOM element when
     *    the game is won requires us to synchronize the local
     *    `gameWon` variable with an external system (the DOM). What
     *    tool have we learned about that allows us to do that?
     */





   const [dice, setDice] = useState(() =>generateAllNewDice())


    const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

    const buttonRef = useRef(null)
    console.log(buttonRef)

useEffect( ()=> {
    if(gameWon) {
        buttonRef.current.focus()
    }
},[gameWon] )

    function generateAllNewDice() {
        const dice = []

        for (let i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random()*6)+1
            dice.push({value:randomNumber, isHeld:false, id:nanoid()})
        }

        return dice
    }

    function rollDice() {

        if(!gameWon) {
             setDice(oldDice =>
        oldDice.map(dice =>
            dice.isHeld ? dice : {...dice, value:Math.floor(Math.random() * 6)+1}
        )
      )

        } else {
            setDice(generateAllNewDice())
        }


    }

   function flip(id) {
    setDice(prevDice =>
        prevDice.map(dice =>
            dice.id === id
                ? { ...dice, isHeld: !dice.isHeld }
                : dice
        )
    )
}





    const diceElements = dice.map((number, index) => (
        <Die key={number.id}
        value={number.value}
        isHeld={number.isHeld}
        onClick={()=>flip(number.id)}

         />
    ))

    return (

        <>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! press "New Game" to start again</p>}
            </div>
          <main className="main">
             <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
             <button className="roll-dice"
             ref={buttonRef}
             onClick={rollDice}>{gameWon? "NewGame" : "Roll"}</button>

        </main>
        </>

    )
}
