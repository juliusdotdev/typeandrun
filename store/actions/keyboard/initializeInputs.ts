// ACTIONS
import setTextToType from './setTextToType'
import setWordsToType from './setWordsToType'
import setNextWord from './setNextWord'
import setCurrentValue from './setCurrentValue'

/**
 *
 * @param textToType {string}
 */
export default (textToType: string) => (dispatch) => {
    const wordsToType = textToType.split(' ')
    const nextWord = wordsToType[0]

    dispatch(setTextToType(textToType))
    dispatch(setWordsToType(wordsToType))
    dispatch(setNextWord(nextWord))
    dispatch(setCurrentValue(''))
}
