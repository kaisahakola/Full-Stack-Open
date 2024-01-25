import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ statistics }) => {
  const good = statistics[0]
  const neutral = statistics[1]
  const bad = statistics[2]
  const all = statistics[3]
  const avarage = statistics[4]
  const positive = statistics[5]

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='avarage' value={avarage} />
        <StatisticLine text='positive' value={positive} />
      </>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
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
      <Statistics statistics={[good, neutral, bad, all, avarage, positive]} />
    </div>
  )
}

export default App