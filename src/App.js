import React from "react"
import Home from "./Views/Home"
import Game from "./Views/Game"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
