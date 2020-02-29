// REACT
import React from 'react'
// REDUX
import {useDispatch, useSelector} from 'react-redux'
// STYLES
import styled from 'styled-components'
import colors from '../../lib/colors'
import initializeInputs from '../../store/actions/keyboard/initializeInputs'
import handleUserInput from '../../store/actions/keyboard/handleUserInput'

export default () => {
    const dispatch = useDispatch()

    // INITIALIZE INPUTS ON MOUNT
    React.useEffect(() => {
        dispatch(initializeInputs('This is some pretty cool sample text.'))
    }, [dispatch])

    // CREATE REF FOR USER INPUT ELEMENT
    const userInputElement = React.useRef(null)

    // GET VALUES FROM STORE
    const wordsToType = useSelector(state => state.keyboard.wordsToType)
    const wordsTyped = useSelector(state => state.keyboard.wordsTyped)
    const currentInputValue = useSelector(state => state.keyboard.currentValue)
    const textToType = useSelector(state => state.keyboard.wordsToType).join(' ')

    // HANDLE USER INPUT
    const handleUserInputChange = React.useCallback(e => {
        dispatch(handleUserInput(e))
    }, [dispatch])

    // FOCUSES THE USER INPUT
    const focusUserInputElement = React.useCallback(() => {
        userInputElement.current.focus()
    }, [userInputElement.current])

    return (
        <InputWrapper onClick={focusUserInputElement}>
            <WordDisplay position="left">
                {wordsTyped.map((word, idx) => (
                    <Word key={`${word}-${idx}`}>{word}</Word>
                ))}
            </WordDisplay>
            <WordDisplay position="right">
                {wordsToType.map((word, idx) => (
                    <Word key={`${word}-${idx}`}>{word}</Word>
                ))}
            </WordDisplay>
            {/*<UserInput*/}
            {/*    type="text"*/}
            {/*    ref={userInputElement}*/}
            {/*    value={currentInputValue}*/}
            {/*    onChange={handleUserInputChange}*/}
            {/*/>*/}
            {/*<PreviewInput*/}
            {/*    readOnly*/}
            {/*    type="text"*/}
            {/*    value={textToType}*/}
            {/*/>*/}
        </InputWrapper>
    )
}

const InputWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 80px;
  margin-top: 64px;
`

interface WordDisplayProps {
    readonly position: string;
}

const WordDisplay = styled.section<WordDisplayProps>`
  position: absolute;
  width: 50%;
  top: 0;
  bottom: 0;
  left: ${({position}) => position === 'left' ? 0 : 'unset'};
  right: ${({position}) => position === 'right' ? 0 : 'unset'};
  font-size: 1.6rem;
  text-align: ${({position}) => position === 'right' ? 'left' : 'right'};
`

const Word = styled.span`
  display: inline-block;
  padding: 0 6px;
`
