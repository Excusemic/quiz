import React, { useEffect, useRef, useState, useMemo, useCallback } from "react"

const Question = ({
  question,
  correct_answer,
  incorrect_answers,
  nextQuestion,
  guessCorrect,
  currentQuestion,
  questions,
}) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [chosenAnswer, setChosenAnswer] = useState("")
  const answersRef = useRef(null)

  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5)
  }
  const allAnswers = useMemo(() => shuffle(incorrect_answers.concat(correct_answer)), [
    correct_answer,
    incorrect_answers,
  ])

  const handleAnswer = useCallback(
    (answer) => {
      setIsAnswered(false)
      const chosenAnswer = answer.innerHTML
      if (chosenAnswer === correct_answer) {
        guessCorrect()
        nextQuestion()
      } else {
        nextQuestion()
      }
    },
    [correct_answer, guessCorrect, nextQuestion]
  )
  const handleClick = (e) => {
    if (e.target.tagName === "DIV" || e.target.tagName === "BUTTON") {
      setIsAnswered(true)
      setChosenAnswer(e.target)

      answersRef.current.style.pointerEvents = "none"
      const children = answersRef.current.children
      for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === correct_answer) {
          children[i].classList.add("correct")
        } else if (children[i].innerHTML !== "Next question") {
          children[i].classList.add("wrong")
        }
      }
    }
  }
  useEffect(() => {
    if (isAnswered) {
      const children = answersRef.current.children
      let styling = setTimeout(() => {
        handleAnswer(chosenAnswer)
        if (currentQuestion < questions - 1) {
          for (let i = 0; i < children.length; i++) {
            children[i].className = ""
          }
          answersRef.current.style.pointerEvents = "unset"
        }
      }, 1000)
      return () => {
        clearTimeout(styling)
        setIsAnswered(false)
        setChosenAnswer("")
      }
    }
  }, [isAnswered, chosenAnswer, currentQuestion, handleAnswer, questions])
  return (
    <div className="question">
      <h2>{question}</h2>
      <article className="answers" onClick={handleClick} ref={answersRef}>
        {allAnswers.map((elem, index) => {
          return (
            <div key={index} className="questionText">
              {elem}
            </div>
          )
        })}
        <button>Next question</button>
      </article>
    </div>
  )
}

export default Question
