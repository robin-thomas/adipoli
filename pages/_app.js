import { SWRConfig } from 'swr'
import fetch from '../utils/fetchJson'

import '../public/styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
