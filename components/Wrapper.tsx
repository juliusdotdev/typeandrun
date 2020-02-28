// REACT
import React from 'react'
// STYLES
import styled from 'styled-components'

export default ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (min-width: 1024px) {
    padding: 0;
  }
`
