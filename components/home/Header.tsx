// REACT
import React from 'react'
// STYLES
import styled from 'styled-components'

export default () => {
    return (
        <Header>
            <Headline>// TYPE AND RUN</Headline>
        </Header>
    )
}

const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Headline = styled.h1`
  font-size: 2rem;
  margin: 0 0 24px;
  
  @media (min-width: 375px) {
    font-size: 2.4rem;
  }
  
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`
