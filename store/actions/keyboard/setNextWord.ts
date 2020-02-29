// ACTION TYPES
import {SET_NEXT_WORD} from './actionTypes'

/**
 *
 * @param nextWord {string}
 */
export default (nextWord: string) => ({
    type: SET_NEXT_WORD,
    payload: {nextWord}
})
