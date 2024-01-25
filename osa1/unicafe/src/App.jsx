import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, statistic }) => {
  if (text === 'positive') {
    return (
      <>
        <p>{text} {statistic} %</p>
      </>
    )
  } else {
    return (
      <>
        <p>{text} {statistic}</p>
      </>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avarage, setAvarage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodButton = () => {
    const newGood = good + 1
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    handleAvarage(newGood, bad, newAll)
    handlePositive(newGood, newAll)
  }

  const handleNeutralButton = () => {
    const newNeutral = neutral + 1
    const newAll = all + 1
    setNeutral(newNeutral)
    setAll(newAll)
    handleAvarage(good, bad, newAll)
    handlePositive(good, newAll)
  }

  const handleBadButton = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    handleAvarage(good, newBad, newAll)
    handlePositive(good, newAll)
  }

  const handleAvarage = (newGood, newBad, newAll) => {
    console.log("good: ", newGood)
    console.log("bad: ", newBad)
    console.log("all: ", newAll)

    const value = newGood * 1 + newBad * -1
    // Using ternary operator to check if all is 0
    setAvarage(all === 0 ? 0 : value / newAll)
  }

  const handlePositive = (newGood, newAll) => {
    // Using ternary operator to check if all is 0
    setPositive(newAll === 0 ? 0 : (newGood / newAll) * 100)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodButton} text='good' />
      <Button handleClick={handleNeutralButton} text='neutral' />
      <Button handleClick={handleBadButton} text='bad' />
      <h2>Statistics</h2>
      <Statistic text='good' statistic={good} />
      <Statistic text='neutral' statistic={neutral} />
      <Statistic text='bad' statistic={bad} />
      <Statistic text='all' statistic={all} />
      <Statistic text='avarage' statistic={avarage} />
      <Statistic text='positive' statistic={positive} />
    </div>
  )
}

export default App