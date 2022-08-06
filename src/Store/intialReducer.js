import {combineReducers} from 'redux'
import {user} from './reducers'
import { auth } from './Reducer/authReducer'

export const reducers=combineReducers({
    user,
    auth
})