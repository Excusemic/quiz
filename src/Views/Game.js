import React, { useState } from "react"
import { useGlobalContext } from "../context"
import Question from "../Components/Question"
import { Link } from "react-router-dom"

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const { state, resetdata } = useGlobalContext()
  const { data, loading } = state
  const { response_code, results } = data
  const percentage = () => {
    const onePerc = results.length / 100
    const res = score / onePerc
    return res.toFixed(2)
  }
  const nextQuestion = () => {
    setCurrentQuestion((prevState) => {
      return prevState + 1
    })
  }
  const guessCorrect = () => {
    setScore((prevState) => {
      return prevState + 1
    })
  }

  switch (response_code) {
    case 0:
      if (loading === false) {
        if (currentQuestion < results.length) {
          return (
            <div>
              <p className="score">
                correct: {score}/{results.length}
              </p>
              <Question
                className="nesto"
                {...results[currentQuestion]}
                questions={results.length}
                currentQuestion={currentQuestion}
                nextQuestion={nextQuestion}
                guessCorrect={guessCorrect}
              />
              <Link to="/">
                <button onClick={resetdata} className="exit-btn">
                  Exit
                </button>
              </Link>
            </div>
          )
        } else {
          return (
            <div className="endscore">
              <h1>
                Your score is {score} / {results.length}
                <p>{percentage()}%</p>
              </h1>
              <Link to="/">
                <button onClick={resetdata}>Play again</button>
              </Link>
            </div>
          )
        }
      } else {
        return <h1 className="loading">Loading...</h1>
      }
    case 1:
      return (
        <div className="invalidParameters">
          <h1>Not enough questions for selected parameters</h1>
          <p>Either lower number of questions or try different parameters</p>
          <Link to="/">
            <button>Go back</button>
          </Link>
        </div>
      )
    default:
      if (loading) {
        return <h1>Loading...</h1>
      } else {
        return (
          <div>
            <h1>
              Something went wrong with searching for questions, change parameters and try again
            </h1>
            <Link to="/">
              <button>Go back</button>
            </Link>
          </div>
        )
      }
  }
}

export default Game
