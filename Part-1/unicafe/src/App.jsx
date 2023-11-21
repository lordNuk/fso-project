import { useState } from 'react'

const Button = ({ val, setVal, text }) => (
  <button onClick={() => setVal(val+1)}>{text}</button>
)

const StatisticLine = ({ text, val }) => (
  <tr>
    <td>{text}</td>
    <td>{val}</td>
  </tr>
)

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral;
  return (
    <table>
    <tbody>
    <StatisticLine text="good" val={good} />
    <StatisticLine text="neutral" val={neutral} />
    <StatisticLine text="bad" val={bad} />
    <StatisticLine text="all" val={all} />
    <StatisticLine text="average" val={(good - bad) / all} />
    <StatisticLine text="positive" val={good * 100 / all} />
    </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
    <h1>give feedback</h1>
    <Button val={good} setVal={setGood} text="good" />
    <Button val={neutral} setVal={setNeutral} text="neutral" />
    <Button val={bad} setVal={setBad} text="bad" />
    <h1>statistics</h1>
    {
      (good || bad || neutral) 
      ? <Statistics good={good} bad={bad} neutral={neutral} />
      : <p>No feedback given</p>
    }
    </div>
  )
}

export default App
