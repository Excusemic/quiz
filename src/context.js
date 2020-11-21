import React, { useContext, useState, useEffect, useReducer } from "react"
import { useFetch } from "./Hooks/useFetch"
import reducer from "./reducer"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [newGame, setNewGame] = useState({
    numberOfQuestions: "",
    category: "",
    difficulty: "",
  })

  const query = {
    amount: newGame.numberOfQuestions,
    category: newGame.category,
    difficulty: newGame.difficulty,
  }
  const url = `https://opentdb.com/api.php?amount=${query.amount || 10}&category=${
    query.category || 9
  }&difficulty=${query.difficulty || "easy"}&type=multiple`
  const gameQuestions = useFetch(url)
  const [state, dispatch] = useReducer(reducer, { ...gameQuestions })
  const resetdata = () => {
    setNewGame({
      ...newGame,
      numberOfQuestions: 15,
    })
  }
  const startNewGame = (numberOfQuestions, category, difficulty) => {
    setNewGame({
      numberOfQuestions,
      category,
      difficulty,
    })
  }
  useEffect(() => {
    dispatch({ type: "UPDATED_GAME_QUESTIONS", payload: gameQuestions })
  }, [gameQuestions])
  return (
    <AppContext.Provider value={{ state, startNewGame, resetdata }}>{children}</AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppProvider }
