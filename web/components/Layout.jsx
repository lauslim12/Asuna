import { chakra, Flex, Spacer } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="favicon.png" type="image/png" />
        <title>
          {[...title.map((x) => x?.trim()).filter((x) => x), 'Project Asuna'].join(' · ')}
        </title>
      </Head>

      <Flex minH="100vh" direction="column" maxW="1200px" mx="auto">
        <Header />

        <chakra.div p={4}>{children}</chakra.div>
        <Spacer />

        <Footer />
      </Flex>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(String).isRequired,
};

export default Layout;
