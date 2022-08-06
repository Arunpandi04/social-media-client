import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './intialReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk]

const state = {}
const store = createStore(
    reducers,
    state,
    applyMiddleware(...middleware)
)

export default store