import React, {useState, useEffect} from "react"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid";
import './App.css';
import Die from './components/Die';

function App() {
  const [dice, setDice] = useState(randomDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  function randomDice() {
    let newDice = [] 
    for(let i = 0; i<10; i++){
      newDice.push({
          value: Math.ceil(Math.random()*6),
          isHeld: false,
          id: nanoid()
        })
    }
    return newDice
  }

  function rollDice() {
    let newDice = []
    dice.map(die => {
        const newDie = die.isHeld ? die : {...die, value: Math.ceil(Math.random()*6)} 
        return newDice.push(newDie)
      }
    )
    setDice(newDice)
    // roll count
    const anyHeld = dice.filter(die=>die.isHeld)
    console.log(anyHeld.length)
    if(anyHeld.length>0){
      setRollCount(prevRollCount=>prevRollCount+1)
    } else {
      setRollCount(0)
    }
    // reset game
    if (tenzies) {
      setDice(randomDice())
      setTenzies(false)
      setRollCount(0)
    }
  }

  function freezeDie(id) {
    let newDice = [] 
    dice.map((die) => {
        const newDie = die.id === id ? {...die, isHeld : !die.isHeld} : die
        return newDice.push(newDie)
      }
    )
    setDice(newDice)
  }
  
  useEffect(()=>{
    const allHeld = dice.every(die=>die.isHeld)
    const allSameValue = dice.every(die=>die.value===dice[0]?.value)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("SOLVED")
    }
  },[dice])

  
  const Dice = dice?.map((die) => <Die value={die.value} isHeld={die.isHeld} freezeDie={()=>freezeDie(die.id)} key={die.id}/>)

  return (
    <>
      {tenzies && <Confetti/>}
      <div className="text-center flex flex-col mx-auto w-screen md:w-96 h-screen md:h-[90vh] bg-slate-100 rounded-lg items-center justify-center md:mt-6">

      {tenzies ? 
        (
          <h1 className="text-5xl font-bold text-slate-700">You Won!</h1>
        ) :
        (
          <>
            <h1 className="text-3xl font-bold my-4 text-slate-700">Tenzies</h1>
            <p className="text-gray-500 mx-4">
              Roll until all dice are the same, click each die to freeze it at its current value between rolls
            </p>
          </>
        )
      }

        <div className="grid grid-cols-5 gap-3 md:gap-4 mt-8">
          {Dice}
        </div>
        <div className="mt-8">
          <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={rollDice}>
            {tenzies ? "Reset Game": "Roll"}
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Roll count : {rollCount}
        </p>
      </div>
    </>
  );
}

export default App;
