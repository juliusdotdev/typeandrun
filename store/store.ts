// REDUX
import {configureStore} from '@reduxjs/toolkit'
// ROOT REDUCER
import rootReducer from './reducers'

// CONFIGURE REDUX STORE
const initializeStore = (preloadedState: object) => configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    devTools: {
        name: 'TYPE AND RUN',
        trace: true,
        features: {
            jump: false
        }
    }
})

export default initializeStore
