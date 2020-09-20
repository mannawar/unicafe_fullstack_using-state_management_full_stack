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
    case 'TOTAL':
      return {...state, total: (state.good + state.bad + state.neutral)}
    case 'AVERAGE':
        return {...state, average: ((state.good - state.bad)/(state.good + state.neutral + state.bad))}
    case 'RESET':
      return {...state, good:0, bad:0, neutral: 0, total: 0, average: 0}
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
    //reset
    const reset = () => {
      store.dispatch({
        type: 'RESET'
      })  
    }
  

  return (
    <div>
      <h2>Please leave your feedback here</h2>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={total}>total</button>
      <button onClick={average}>average</button>
      <button onClick={reset}>reset stats</button>
      <div>Good: {store.getState().good}</div>
      <div>Neutral: {store.getState().neutral}</div>
      <div>Bad: {store.getState().bad}</div>
      <div>Total: {store.getState().total}</div>
      <div>Average: {store.getState().average}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)