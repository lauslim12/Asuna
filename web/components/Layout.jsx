import { Flex, Spacer } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />

      {children}
      <Spacer />

      <Footer />
    </Flex>
  );
};

export default Layout;
