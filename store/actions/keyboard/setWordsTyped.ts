// ACTION TYPES
import {SET_WORDS_TYPED} from './actionTypes'

/**
 *
 * @param wordsTyped {array}
 */
export default (wordsTyped: Array<string>) => ({
    type: SET_WORDS_TYPED,
    payload: {wordsTyped}
})
