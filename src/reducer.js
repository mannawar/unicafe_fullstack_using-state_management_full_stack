const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  // if(action.type === 'ACTUAL_FEEDBACK') {
  //   state.concat(action.feedback)
  //   return state
  // }

  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
    case 'NEUTRAL':
      return state
    case 'BAD':
      return state
    case 'RESET':
      return state
    default: return state
  }
  
}

// const store = createStore(counterReducer)

// store.dispatch({
//   type: 'ACTUAL_FEEDBACK',
//   feedback: {
//     good: 5,
//     ok: 4,
//     bad: 2
//   }
// })

export default counterReducer