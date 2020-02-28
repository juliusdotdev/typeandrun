// REDUX
import {combineReducers} from 'redux'
// REDUCERS
import * as keyboard from './keyboard'

// ROOT REDUCER
export default combineReducers({
    [keyboard.key]: keyboard.reducer
})
