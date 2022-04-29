/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import 'focus-visible/dist/focus-visible';
import '../styles/NProgress.scss';
import '../styles/Selection.scss';
import '../styles/DatePicker.scss';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';

import NProgress from '../components/NProgress';
import UserContextProvider from '../components/UserProvider';
import scrollPreserver from '../utils/scrollPreserver';

const fallbackFonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

function App({ Component, pageProps }) {
  scrollPreserver();

  return (
    <UserContextProvider>
      <ChakraProvider
        resetCSS
        theme={extendTheme({
          fonts: {
            body: `Lato, ${fallbackFonts}`,
            heading: `Lato, ${fallbackFonts}`,
          },
        })}
      >
        <Head>
          <meta charSet="UTF-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>

        <NProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default App;
