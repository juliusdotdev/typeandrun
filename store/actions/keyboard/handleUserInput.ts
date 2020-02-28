// ACTIONS
import setUserInputValue from './setUserInputValue'
import setPreviewInputValue from './setPreviewInputValue'

export const handleUserInput = (value: string) => (dispatch, getState) => {
    const state = getState()
    const previewValue = state.keyboard.previewValue

    const inputLetter = value[value.length - 1]
    const nextPreviewLetter = previewValue[0]

    if (inputLetter === nextPreviewLetter) {
        dispatch(setUserInputValue(value))
        dispatch(setPreviewInputValue(previewValue.substring(1)))
    }
}

export default handleUserInput
