import { SWRConfig } from 'swr';
import { ThemeProvider } from '@material-ui/core';
import fetch from '../utils/fetchJson';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../public/global.css';

import theme from '../theme';
import GlobalStyles from '../theme/GlobalStyles';
import DataProvider from '../components/utils/DataProvider';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: console.error,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
