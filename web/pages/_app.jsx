/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/NProgress.css';

import { ChakraProvider } from '@chakra-ui/react';

import NProgress from '../components/NProgress';
import scrollPreserver from '../utils/scrollPreserver';

const App = ({ Component, pageProps }) => {
  scrollPreserver();

  return (
    <ChakraProvider>
      <NProgress />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
