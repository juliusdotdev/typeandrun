// NEXT
import {AppProps} from 'next/app'
// STYLES
import 'normalize.css/normalize.css'
import '../public/global.css'

function App ({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default App
