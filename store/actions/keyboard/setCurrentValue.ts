// ACTION TYPES
import {SET_CURRENT_VALUE} from './actionTypes'

/**
 *
 * @param newValue {string}
 */
export default (currentValue: string) => ({
    type: SET_CURRENT_VALUE,
    payload: {currentValue}
})
