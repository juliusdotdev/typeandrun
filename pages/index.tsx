import React from 'react'
// REDUX
import { Provider } from 'react-redux'
import store from '../store/store'
// COMPONENTS
import PageContainer from '../components/PageContainer'
import Wrapper from '../components/Wrapper'
import Header from '../components/home/Header'
import Stats from '../components/home/Stats'
import Input from '../components/home/Input'

const Home = () => {
    return (
      <Provider store={store}>
          <PageContainer>
              <Wrapper>
                  <Header/>
                  <Stats/>
              </Wrapper>
              <Input/>
          </PageContainer>
      </Provider>
    )
}

export default Home
