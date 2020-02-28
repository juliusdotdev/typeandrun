import React from 'react'
// REDUX
import {withRedux} from "../lib/redux"
// COMPONENTS
import PageContainer from '../components/PageContainer'
import Wrapper from '../components/Wrapper'
import Header from '../components/home/Header'
import Stats from '../components/home/Stats'
import Input from '../components/home/Input'

const Home = () => {
    return (
        <PageContainer>
            <Wrapper>
                <Header/>
                <Stats/>
            </Wrapper>
            <Input/>
        </PageContainer>
    )
}

export default withRedux(Home)
