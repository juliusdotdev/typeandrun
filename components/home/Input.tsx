// REACT
import React from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { selectPreviewValue, selectUserValue, handleUserInput } from '../../store/reducers/keyboardSlice'
// STYLES
import styled from 'styled-components'
import colors from '../../lib/colors'

export default () => {
    const dispatch = useDispatch()
    const userInputValue = useSelector(selectUserValue)
    const previewInputValue = useSelector(selectPreviewValue)

    const handleUserInputChange = React.useCallback(e => {
        dispatch(handleUserInput(e.target.value))
    }, [dispatch])

    return (
        <InputWrapper>
            <UserInput
                type="text"
                value={userInputValue}
                onChange={handleUserInputChange}
            />
            <PreviewInput
                type="text"
                value={previewInputValue}
            />
        </InputWrapper>
    )
}

const InputWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 80px;
  margin-top: 64px;
`

const UserInput = styled.input`
  position: absolute;
  padding: 0;
  width: 50%;
  top: 0;
  left: 0;
  bottom: 0;
  font-size: 1.6rem;
  text-align: right;
  outline: none;
  appearance: none;
  border: none;
  border-radius: 0;
  background: ${colors.grey2};
  color: ${colors.accent};
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`

const PreviewInput = styled(UserInput)`
  right: 0;
  left: unset;
  text-align: left;
`
