import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

export const initializeStore = (preloadedState = {}) => {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}
