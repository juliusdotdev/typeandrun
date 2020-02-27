import React from 'react'
// REDUX
import {withRedux} from "../lib/redux";

const Home = () => {
    return (
        <h1>Type and run!</h1>
    )
}

export default withRedux(Home)