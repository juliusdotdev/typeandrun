// REACT
import React from 'react'
// NEXT
import Head from 'next/head'
// STYLES
import colors from '../lib/colors'
import styled from 'styled-components'

export default ({children}) => {
    return (
        <>
            <Head>
                <title>Type and Run!</title>
                <link
                    href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <PageContainer>
                {children}
            </PageContainer>
        </>
    )
}

const PageContainer = styled.main`
  padding: 80px 0 0;
  min-height: 100vh;
  background: ${colors.background};
  color: ${colors.accent};
`
