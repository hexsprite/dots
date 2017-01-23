import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import _ from 'lodash'


export const reducer = (state={}, action) => {
  switch (action.type) {
  case 'ANSWER':
    // args: questionId, day, checked
    const {questionId, day, checked} = action
    const newState = _.cloneDeep(state)
    if (!newState.answers)
      newState.answers = {}
    _.setWith(newState.answers, [day, questionId], checked, Object)
    return newState
  default:
    return state
  }
}

// export const startClock = () => dispatch => {
//   return setInterval(() => dispatch({ type: 'TICK', light: true, ts: Date.now() }), 800)
// }

export const initStore = (reducer, initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
    }
    return window.store
  }
}
