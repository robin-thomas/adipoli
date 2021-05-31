import { SWRConfig } from 'swr'
import { ThemeProvider } from '@material-ui/core';
import fetch from '../utils/fetchJson'

// import '../public/styles/global.css'
import theme from '../theme';
import GlobalStyles from '../components/GlobalStyles';

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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
