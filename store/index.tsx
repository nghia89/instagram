import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import app from './reducers/appReducer'
import Users from './reducers/userReducer'

const reducer = combineReducers({
    app: app,
    users: Users
})
const store = configureStore({
    reducer,
})
export default store;