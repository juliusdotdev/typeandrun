// REDUX
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
// UTILS
import isEmpty from 'lodash/isEmpty'

// INITIAL STATE
const initialState = {
    inputValue: '' as string,
    nextWord: '' as string,
    leftWords: [] as Array<string>,
    typedWords: [] as Array<string>,
    startTimestamp: -1 as number,
    finishTimestamp: -1 as number,
    roundStarted: false as boolean,
    roundFinished: false as boolean
}

// REDUCER
const typingReducer = createSlice({
    name: 'typing',
    initialState: initialState,
    reducers: {
        /**
         * Updates the next word value in the store
         */
        setNextWord (state, action: PayloadAction<string>) {
            state.nextWord = action.payload
        },

        /**
         * Pushes a new word into the list of typed words
         */
        saveTypedWord (state, action: PayloadAction<string>) {
            state.typedWords.push(action.payload)
        },

        /**
         * Updates the input value in the store
         */
        setInputValue (state, action: PayloadAction<string>) {
            state.inputValue = action.payload
        },

        /**
         * Updates the left words list in the store
         */
        setLeftWords (state, action: PayloadAction<Array<string>>) {
            state.leftWords = action.payload
        },

        /**
         * Sets the start timestamp to the current timestamp
         */
        setStartTimestamp (state) {
            state.startTimestamp = Date.now()
        },

        /**
         * Sets the finish timestamp to the current timestamp
         */
        setFinishTimestamp (state) {
            state.finishTimestamp = Date.now()
        },

        /**
         * Sets the roundStarted flag to true
         */
        setRoundStarted (state) {
            state.roundStarted = true
        },

        /**
         * Sets the roundStarted flag to false
         */
        setRoundFinished (state) {
            state.roundFinished = true
        }
    }
})

const {reducer, actions: reducerActions} = typingReducer

// THUNKS
/**
 * Initializes the app with a text for the user to type
 * @param {string} text - The text to initialize the app with
 */
export const initializeApp = (text: string) => async (dispatch, getState) => {
    const trimmedText = text.trim()
    const words = trimmedText.split(' ')

    dispatch(actions.setNextWord(words[0]))
    dispatch(actions.setLeftWords(words.slice(1)))
}

/**
 *
 * @param {string} inputValue - The current value of the input
 */
export const handleInputValueChange = (inputValue) => async (dispatch, getState) => {
    const state = getState()
    const roundStarted = getRoundStarted(state)
    const nextWord = getNextWord(state)
    const nextLetter = nextWord.charAt(0)
    const typedWords = getTypedWords(state)
    const trimmedInputValue = inputValue.substr(typedWords.join(' ').length).trim()

    if (!roundStarted) {
        dispatch(actions.setStartTimestamp())
        dispatch(actions.setRoundStarted())
    }

    if (!nextWord) {
        return state
    }

    if (trimmedInputValue.charAt(trimmedInputValue.length - 1) === nextLetter) {
        dispatch(actions.setInputValue(trimmedInputValue))
        await dispatch(actions.setNextWord(nextWord.substr(1)))

        const state = getState()
        const newNextWord = getNextWord(state)
        const newLeftWords = getLeftWords(state)

        if (!newNextWord && isEmpty(newLeftWords)) {
            dispatch(actions.setFinishTimestamp())
            dispatch(actions.setRoundFinished())
        }
    }
}

/**
 * Takes the current input value, saves it the list of typed words and empties out the input value, while setting the
 * next word to type and updating the list of left words
 */
export const saveWordAndResetInput = () => async (dispatch, getState) => {
    const state = getState()
    const nextWord = getNextWord(state)

    if (nextWord) return

    const inputValue = getInputValue(state)
    const leftWords = getLeftWords(state)
    const newNextWord = leftWords[0]
    const newLeftWords = leftWords.slice(1)

    dispatch(actions.saveTypedWord(inputValue))
    dispatch(actions.setNextWord(newNextWord))
    dispatch(actions.setLeftWords(newLeftWords))
    dispatch(actions.setInputValue(''))
}

const actions = {
    ...reducerActions,
    handleInputValueChange,
    saveWordAndResetInput,
    initializeApp
}

// SELECTORS
/**
 * Returns the list of left words to type
 * @return {Array.<string>} leftWords - The array of left words
 */
export const getLeftWords = state => state.typing.leftWords

/**
 * Returns the list of typed words
 * @return {Array.<string>} typedWords - The array of typed words
 */
export const getTypedWords = state => state.typing.typedWords

/**
 * Returns the next word to type
 * @return {string} nextWord - The next word to type
 */
export const getNextWord = state => state.typing.nextWord

/**
 * Returns the current input value
 * @return {string} inputValue - The current input value
 */
export const getInputValue = state => state.typing.inputValue

/**
 * Returns the start timestamp of the round
 * @return {number} startTimestamp - The timestamp of the beginning of the round
 */
export const getStartTimestamp = state => state.typing.startTimestamp

/**
 * Returns the finishing timestamp of the round
 * @return {number} finishTimestamp - The timestamp of the finishing of the round
 */
export const getFinishTimestamp = state => state.typing.finishTimestamp

/**
 * Returns the time needed to complete the text in UTC milliseconds
 * @return {number} duration - The duration of the round
 */
export const getRoundDuration = state => getFinishTimestamp(state) - getStartTimestamp(state)

/**
 * Returns whether the round as been started or not
 * @return {boolean} roundStarted - The is-started state of the round
 */
export const getRoundStarted = state => state.typing.roundStarted

/**
 * Returns whether the round as been finished or not
 * @return {boolean} roundFinished - The is-finished state of the round
 */
export const getRoundFinished = state => state.typing.roundFinished

/**
 * Returns the words written per minute
 * @return {number} wordsPerMinute - The amount of words written per minute
 */
export const getWordsPerMinute = state => {
    const isRoundStarted = getRoundStarted(state)
    const isRoundFinished = getRoundFinished(state)

    if (!isRoundStarted || !isRoundFinished) {
        return 0
    }

    if (isRoundStarted && isRoundFinished) {
        const roundDurationInMs = getRoundDuration(state)
        const roundDurationInMinutes = roundDurationInMs / 1000 / 60
        const typedWords = getTypedWords(state)
        const typedWordsAmount = typedWords.length

        if (roundDurationInMinutes !== 1) {
            const multiplicator = 1 / roundDurationInMinutes

            return Math.round(typedWordsAmount * multiplicator)
        }

        return Math.round(typedWordsAmount)
    }
}

/**
 * Returns the characters written per minute
 * @return {number} charactersPerMinute - The amount of characters written per minute
 */
export const getCharactersPerMinute = state => {
    const isRoundStarted = getRoundStarted(state)
    const isRoundFinished = getRoundFinished(state)

    if (!isRoundStarted || !isRoundFinished) {
        return 0
    }

    if (isRoundStarted && isRoundFinished) {
        const roundDurationInMs = getRoundDuration(state)
        const roundDurationInMinutes = roundDurationInMs / 1000 / 60
        const typedWords = getTypedWords(state)
        const typedCharactersAmount = typedWords.join(' ').length

        const multiplicator = 1 / roundDurationInMinutes

        return Math.round(typedCharactersAmount * multiplicator)
    }
}

/**
 * Returns the put-together string, consisting of the typed words and the current input value
 * @return {string} compositeInputValue - The typed words and current input value combined
 */
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

/**
 * Returns the put-together string, consisting of the next word and the other words left to type
 * @return {string} compositeLeftWords - The next word and left words to type combined
 */
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
