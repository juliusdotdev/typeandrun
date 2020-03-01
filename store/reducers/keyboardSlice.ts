import { createSlice } from '@reduxjs/toolkit'

//
// KEYBOARD SLICE
//

export const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState: {
        previewValue: 'This is just some sample text',
        userValue: ''
    },
    reducers: {
        setPreviewValue: (state, action) => {
            state.previewValue = action.payload.previewValue
        },
        setUserValue: (state, action) => {
            state.userValue = action.payload.userValue
        }
    }
})

//
// ACTIONS
//

export const {
    setPreviewValue,
    setUserValue
} = keyboardSlice.actions

//
// SELECTORS
//

export const selectPreviewValue = state => state.keyboard.previewValue
export const selectUserValue = state => state.keyboard.userValue

//
// EXPORT REDUCER SLICE
//

export default keyboardSlice.reducer

//
// THUNKS
//

export const handleUserInput = (value: string) => (dispatch, useSelector) => {
    const previewValue = useSelector(selectPreviewValue)

    const inputLetter = value[value.length - 1]
    const nextPreviewLetter = previewValue[0]

    if (inputLetter === nextPreviewLetter) {
        dispatch(setUserValue(value))
        dispatch(setPreviewValue(previewValue.substring(1)))
    }
}
