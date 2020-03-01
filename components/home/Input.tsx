// REACT
import React, {useCallback, useRef, ChangeEvent, KeyboardEvent, useEffect} from 'react'
// REDUX
import {useDispatch, useSelector} from 'react-redux'
// SELECTORS
import {
    getCompositeInputValue,
    actions, getCompositeLeftWords
} from '../../store/reducers/typing'
// UTILS
import isNil from 'lodash/isNil'
// STYLES
import colors from '../../lib/colors'
import styled from 'styled-components'

const inputDefaults = {
    type: 'text',
    readOnly: false,
    isRight: false
}

const {handleInputValueChange, saveWordAndResetInput, initializeApp} = actions

export default () => {
    const inputElement = useRef<HTMLInputElement>()
    const inputElementReady = !isNil(inputElement.current)
    const dispatch = useDispatch()

    const uiInitializeApp = useCallback((text) => {
        dispatch(initializeApp(text))
    }, [dispatch])

    const uiHandleInputValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(handleInputValueChange(event.target.value))
    }, [dispatch])

    const uiSaveTypedWord = useCallback(() => {
        dispatch(saveWordAndResetInput())
    }, [dispatch])

    const uiHandleInputWrapperClick = useCallback(() => {
        if (inputElementReady) inputElement.current.focus()
    }, [inputElement.current])

    const uiHandleInputKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.charCode === 32) uiSaveTypedWord()
    }, [inputElement.current])

    useEffect(() => {
        // @ts-ignore
        window.init = uiInitializeApp
        uiInitializeApp('Nunc pellentesque egestas commodo. Duis imperdiet, est non rutrum dictum, sapien est pretium magna, eu scelerisque urna lectus in leo. Sed dignissim metus metus, at tempus orci vehicula id. Nulla iaculis, elit quis vehicula bibendum, justo massa auctor massa, id.')
    }, [uiInitializeApp])

    const compositeInputValue = useSelector(getCompositeInputValue)
    const compositeLeftWords = useSelector(getCompositeLeftWords)

    return (
        <InputWrapper onClick={uiHandleInputWrapperClick}>
            <TypingInput
                {...inputDefaults}
                ref={inputElement}
                value={compositeInputValue}
                onKeyPress={uiHandleInputKeyPress}
                onChange={uiHandleInputValueChange}
            />
            <TypingInput
                {...inputDefaults}
                value={compositeLeftWords}
                readOnly
                isRight
            />
        </InputWrapper>
    )
}

const InputWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  margin: 64px 0 0;
  display: flex;
  justify-content: space-evenly;
  background: ${colors.grey3};
`

interface TypingInputProps {
    isRight: boolean;
    readOnly: boolean;
}

const TypingInput = styled.input<TypingInputProps>`
  width: 50%;
  padding: 0;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 0;
  font-size: 2.4rem;
  background: inherit;
  opacity: ${props => props.isRight ? 1 : 0.5};
  color: ${colors.accent};
  text-align: ${props => props.isRight ? 'left' : 'right'};
  ${props => props.readOnly ? 'user-select: none' : ''};
`
