import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    setGood(good + 1)
  }

  const handleNeutralButton = () => {
    setNeutral(neutral + 1)
  }

  const handleBadButton = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodButton} text='good' />
      <Button handleClick={handleNeutralButton} text='neutral' />
      <Button handleClick={handleBadButton} text='bad' />
      <br />
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App