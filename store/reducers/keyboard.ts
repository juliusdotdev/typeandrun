// TYPES
import {GenericAction} from '../types'
// ACTION TYPES
import * as actionTypes from '../actions/keyboard/actionTypes'

const initialState: object = {
    previewValue: 'This is just some sample text',
    userValue: ''
}

export const reducer = (state: object = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_INPUT_VALUE:
            return Object.assign({}, state, {
                userValue: action.payload.value
            })
        case actionTypes.SET_PREVIEW_INPUT_VALUE:
            return Object.assign({}, state, {
                previewValue: action.payload.value
            })
        default:
            return state
    }
}

export const key = 'keyboard'
