import * as actionTypes from './actionTypes'

export const setUserInputValue = value => ({
    type: actionTypes.SET_USER_INPUT_VALUE,
    payload: {
        value
    }
})

export default setUserInputValue
