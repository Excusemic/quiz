import React, { useState, useMemo } from "react"
import categories from "../categories"
import { useGlobalContext } from "../context"
import { useHistory } from "react-router-dom"

const Form = () => {
  const [numberOfQuestions, setNumberofQuesions] = useState(10)
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")
  const values = useMemo(() => Object.keys(categories), [])
  const { startNewGame } = useGlobalContext()
  const history = useHistory()

  const handleChange = (value) => {
    if (value > 0) {
      setNumberofQuesions(value)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    startNewGame(numberOfQuestions, category, difficulty)
    history.push("/game")
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Set up your quiz:</h1>
      <div>
        <label htmlFor="number">Number Of Questions</label>
        <input
          type="number"
          name="number"
          value={numberOfQuestions}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {values.map((value, index) => {
            return (
              <option value={value} key={index}>
                {categories[value]}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <input type="submit" value="Start" />
    </form>
  )
}

export default Form
