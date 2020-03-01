import { configureStore } from '@reduxjs/toolkit'
import keyboardReducer from './reducers/keyboardSlice'

export default configureStore({
    reducer: {
        keyboard: keyboardReducer
    }
})
