// REDUX
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
// UTILS
import isEmpty from 'lodash/isEmpty'

// INITIAL STATE
const initialState = {
    inputValue: '' as string,
    nextWord: '' as string,
    leftWords: [] as Array<string>,
    typedWords: [] as Array<string>
}

// REDUCER
const typingReducer = createSlice({
    name: 'typing',
    initialState: initialState,
    reducers: {
        setNextWord (state, action: PayloadAction<string>) {
            state.nextWord = action.payload
        },
        saveTypedWord (state, action: PayloadAction<string>) {
            state.typedWords.push(action.payload)
        },
        setInputValue (state, action: PayloadAction<string>) {
            state.inputValue = action.payload
        },
        setLeftWords (state, action: PayloadAction<Array<string>>) {
            state.leftWords = action.payload
        }
    }
})

const {reducer, actions: reducerActions} = typingReducer

// THUNKS
export const initializeApp = (text: string) => async (dispatch, getState) => {
    const trimmedText = text.trim()
    const words = trimmedText.split(' ')

    await dispatch(actions.setNextWord(words[0]))
    await dispatch(actions.setLeftWords(words.slice(1)))
}

export const handleInputValueChange = (inputValue) => async (dispatch, getState) => {
    const state = getState()
    const nextWord = getNextWord(state)
    const nextLetter = nextWord.charAt(0)
    const typedWords = getTypedWords(state)
    const trimmedInputValue = inputValue.substr(typedWords.join(' ').length).trim()

    if (!nextWord) return state

    if (trimmedInputValue.charAt(trimmedInputValue.length - 1) === nextLetter) {
        await dispatch(actions.setInputValue(trimmedInputValue))
        await dispatch(actions.setNextWord(nextWord.substr(1)))
    }
}

export const saveWordAndResetInput = () => async (dispatch, getState) => {
    const state = getState()
    const nextWord = getNextWord(state)

    if (nextWord) return

    const inputValue = getInputValue(state)
    const leftWords = getLeftWords(state)
    const newNextWord = leftWords[0]
    const newLeftWords = leftWords.slice(1)

    await dispatch(actions.saveTypedWord(inputValue))
    await dispatch(actions.setNextWord(newNextWord))
    await dispatch(actions.setLeftWords(newLeftWords))
    await dispatch(actions.setInputValue(''))
}

const actions = {
    ...reducerActions,
    handleInputValueChange,
    saveWordAndResetInput,
    initializeApp
}

// SELECTORS
export const getLeftWords = state => state.typing.leftWords
export const getTypedWords = state => state.typing.typedWords
export const getNextWord = state => state.typing.nextWord
export const getInputValue = state => state.typing.inputValue
export const getCompositeInputValue = state => {
    const inputValue = getInputValue(state)
    const typedWords = getTypedWords(state)

    if (isEmpty(typedWords) && inputValue) {
        return inputValue
    } else if (isEmpty(typedWords) && !inputValue) {
        return ''
    }

    return `${typedWords.join(' ')} ${inputValue}`
}
export const getCompositeLeftWords = state => {
    const nextWord = getNextWord(state)
    const leftWords = getLeftWords(state)

    if (isEmpty(leftWords) && nextWord) {
        return nextWord
    } else if (isEmpty(leftWords) && !nextWord) {
        return ''
    }

    return `${nextWord} ${leftWords.join(' ')}`
}

export {
    reducer,
    actions
}
