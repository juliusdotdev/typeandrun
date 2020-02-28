import * as actionTypes from './actionTypes'

export const setPreviewInputValue = value => ({
    type: actionTypes.SET_PREVIEW_INPUT_VALUE,
    payload: {
        value
    }
})

export default setPreviewInputValue
