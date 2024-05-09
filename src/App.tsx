import React, { useState } from 'react'
import './App.css'

interface clickedProps {
  clientX: number
  clientY: number
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<clickedProps[]>([])
  const [redoPoints, setRedoPoints] = useState<clickedProps[]>([])
  
  function getCoordenates( e:React.MouseEvent<HTMLElement>){ 
    const { clientX, clientY } = e

    setClickedPoints([...clickedPoints, {clientX, clientY }])
    console.log(clickedPoints)
  }

  const undoLastPoint = () => {
    let newClickedPoint = [...clickedPoints]
    let lastMissedPoint = newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
    if(!lastMissedPoint) return
    setClickedPoints(newClickedPoint)
    setRedoPoints([...redoPoints, lastMissedPoint])
  }

  const redoLastPoint = () => {
    let newRedoPoints = [...redoPoints]
    let lastMissedPoint = newRedoPoints.pop();
    if(!lastMissedPoint) return
    setRedoPoints(newRedoPoints)
    setClickedPoints([...clickedPoints, lastMissedPoint])

  }

  return (
    <>
      <button onClick={undoLastPoint} disabled={clickedPoints.length === 0} className='ButtonStyle'>Undo</button>
      <button onClick={redoLastPoint} disabled={redoPoints.length === 0} className='ButtonStyle'>Redo</button>
      <div className="App" onClick={getCoordenates}>
        {clickedPoints.map((clickedPoint, index)=> {
          return (
          <div 
            key={index}
            style={{
            left: clickedPoint.clientX -7,
            top: clickedPoint.clientY -7, 
            position: 'absolute',
            borderRadius: "50%",
            backgroundColor: 'red',
            width: '10px',
            height: '10px',
            }}></div>
          )
        })}
      </div>
    </>
  )
}

export default App
