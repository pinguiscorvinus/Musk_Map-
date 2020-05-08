import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//components
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/:Location">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  )
}

export default App
