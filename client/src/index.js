import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import axios from 'axios';

const counterReducer = (state = 
  axios.get('http://localhost:3001/api/getData')
  .then((res) => {return res.data.feed[8]})
, action) => {
  console.log((state));
  switch (action.type) {
    case 'GOOD':
      return {...state, Good: state.Good + 1}
    case 'NEUTRAL':
      return {...state, neutral: state.Neutral + 1}
    case 'BAD':
      return {...state, bad: state.Bad + 1}
    case 'TOTAL':
      return {...state, total: (state.Good + state.Bad + state.Neutral)}
    case 'AVERAGE':
        return {...state, average: ((state.Good - state.Bad)/(state.Good + state.Neutral + state.Bad))}
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
      <div>Good: {store.getState().Good}</div>
      <div>Neutral: {store.getState().Neutral}</div>
      <div>Bad: {store.getState().Bad}</div>
      <div>Total: {store.getState().Total}</div>
      <div>Average: {store.getState().Average}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)