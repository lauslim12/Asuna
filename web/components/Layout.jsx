import { chakra, Flex, Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />

      <chakra.div p={4}>{children}</chakra.div>
      <Spacer />

      <Footer />
    </Flex>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
