// ACTION TYPES
import {
    SET_CURRENT_VALUE,
    SET_NEXT_WORD,
    SET_TEXT_TO_TYPE,
    SET_WORDS_TO_TYPE,
    SET_WORDS_TYPED
} from '../actions/keyboard/actionTypes'

const initialState: object = {
    textToType: '',
    wordsTyped: [],
    wordsToType: [],
    nextWord: '',
    currentValue: '',
}

export const reducer = (state: object = initialState, action) => {
    switch (action.type) {
        case SET_TEXT_TO_TYPE:
            return Object.assign({}, state, {
                textToType: action.payload.textToType
            })
        case SET_WORDS_TO_TYPE:
            return Object.assign({}, state, {
                wordsToType: action.payload.wordsToType
            })
        case SET_WORDS_TYPED:
            return Object.assign({}, state, {
                wordsTyped: action.payload.wordsTyped
            })
        case SET_NEXT_WORD:
            return Object.assign({}, state, {
                nextWord: action.payload.nextWord
            })
        case SET_CURRENT_VALUE:
            return Object.assign({}, state, {
                currentValue: action.payload.currentValue
            })
        default:
            return state
    }
}

export const key = 'keyboard'
