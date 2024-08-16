import { useState } from 'react'
import Board from './components/Board'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Finde den Schatz</h1>
      <Board/>
    </>
  )
}

export default App
