// REDUX
import {combineReducers} from '@reduxjs/toolkit'
// REDUCERS
import {reducer as typing} from './typing'

// ROOT REDUCER
const rootReducer = combineReducers({
    typing
})

// ROOT STATE TYPE
export type RootState = ReturnType<typeof rootReducer>

// ROOT REDUCER
export default rootReducer
