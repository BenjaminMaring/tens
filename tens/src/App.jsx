import React, { useState } from 'react';
import Box from "./components/Box";
import startingData from './startingData.js';
import './App.css'

function App() {
  const [state, setState] = useState(startingData);
  const [wins, setWins] = useState(0);

  //this function just toggles the lock on a box, by returning a new array with .map with the updated box
  function toggleLock(id) {
    setState(prevState => prevState.map(box => box.id === id ? {...box, locked: !box.locked} : box))
  }

  function roll() {
    setState(prevState => prevState.map(box => {
     if (box.locked) {
        return box;
     } else {
      let random = Math.floor(Math.random() * 10 + 1);
      return ({...box, num: random});
     }
    }));
  }

  function submit() {
    let numCheck = state[0].num;
    for (let box in state) {
      if (state[box].num !==numCheck) {
        alert("Not all numbers are the same");
        return;
      }
    }
    setWins(prevWins => prevWins += 1);
    setState(startingData);
  }
  
  const boxElems = state.map(box => <Box key={box.id} isLocked={box.locked} toggleLock={() => toggleLock(box.id)} num={box.num} />)

  return (
    <>
      <div className="header">
      <h1>Tens</h1>
      <h1>{wins}</h1>
      </div>
      <div className="box-wrapper">
        {boxElems}
      </div>
      <div>
        <button className="btn roll" onClick={roll}>Roll</button>
        <button className="btn submit" onClick={submit}>Submit</button>
      </div>
      <h2>Click on a number to lock it</h2>
    </>
  )
}

export default App
