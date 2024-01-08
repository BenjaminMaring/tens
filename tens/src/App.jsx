import React, { useState } from 'react';
import Box from "./components/Box";
import startingData from './startingData.js';
import './App.css'

function App() {
  const [locks, setLocks] = useState(startingData);
  const [stats, setStats] = useState({wins: 0, rolls: 0});

  //this function just toggles the lock on a box, by returning a new array with .map with the updated box
  function toggleLock(id) {
    setLocks(prevLocks => prevLocks.map(box => box.id === id ? {...box, locked: !box.locked} : box))
  }

  function roll() {
    setStats(prevStats => ({...prevStats, rolls: prevStats.rolls +1 }))
    setLocks(prevLocks => prevLocks.map(box => {
     if (box.locked) {
        return box;
     } else {
      let random = Math.floor(Math.random() * 10 + 1);
      return ({...box, num: random});
     }
    }));
  }

  function submit() {
    let numCheck = locks[0].num;
    for (let box in locks) {
      if (locks[box].num !==numCheck) {
        alert("Not all numbers are the same");
        return;
      }
    }
    setStats(prevStats => ({wins: prevStats.wins +1, rolls: 0}));
    setLocks(startingData);
  }
  
  const boxElems = locks.map(box => <Box key={box.id} isLocked={box.locked} toggleLock={() => toggleLock(box.id)} num={box.num} />)

  return (
    <>
      <div className="header">
        <h1>Tens</h1>
        <h1>Rolls {stats.rolls}</h1>
        <h1>Wins {stats.wins}</h1>
      </div>
      <div className="box-wrapper">
        {boxElems}
      </div>
      <div>
        <button className="btn red" onClick={roll}>Roll</button>
        <button className="btn green" onClick={submit}>Submit</button>
      </div>
      <h2>Click on a number to lock it</h2>
    </>
  )
}

export default App
