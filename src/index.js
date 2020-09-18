import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
//import reducer from './reducer'

const counterReducer = (state = {
  good: 0,
  neutral: 0,
  bad: 0
}, action) => {
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'NEUTRAL':
      return state 
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'RESET':
      return {...state, good:0, bad:0, neutral: 0}
    default:
    return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  //good
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }
  //neutral
  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL'
    })
  }
  //bad
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  //reset
  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })  
  }  
  

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)