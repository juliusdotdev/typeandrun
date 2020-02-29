// ACTION TYPES
import {SET_TEXT_TO_TYPE} from './actionTypes'

/**
 *
 * @param textToType {string}
 */
export default (textToType: string) => ({
    type: SET_TEXT_TO_TYPE,
    payload: {textToType}
})
