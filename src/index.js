import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = {
  good: 0,
  neutral: 0,
  bad: 0, total: 0, average: 0 
}, action) => {
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'NEUTRAL':
      return {...state, neutral: state.neutral + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'RESET':
      return {...state, good:0, bad:0, neutral: 0}
    case 'TOTAL':
      return {...state, total: (state.good + state.bad + state.neutral)}
    case 'AVERAGE':
        return {...state, average: (state.good - state.bad + 0 * state.neutral)/(state.good + state.bad + state.neutral)}
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
  //total
  const total = () => {
    store.dispatch({
      type: 'TOTAL'
    })  
  }
  //average
  const average = () => {
    store.dispatch({
      type: 'AVERAGE'
    })  
  }
  

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <button onClick={total}>total</button>
      <button onClick={average}>average</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>bad {store.getState().bad}</div>
      <div>Total votes: {store.getState().total}</div>
      <div>Average votes: {store.getState().average}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)