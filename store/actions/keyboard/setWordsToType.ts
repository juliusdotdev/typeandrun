// ACTION TYPES
import {SET_WORDS_TO_TYPE} from './actionTypes'

/**
 *
 * @param wordsToType {array}
 */
export default (wordsToType: Array<string>) => ({
    type: SET_WORDS_TO_TYPE,
    payload: {wordsToType}
})
