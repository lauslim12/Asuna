import { chakra, Flex, Spacer } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

function Layout({ children, title }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
      />

      <Head>
        <title>{[...title.map((x) => x?.trim()).filter((x) => x), 'Asuna'].join(' · ')}</title>
      </Head>

      <Flex minH="100vh" direction="column" maxW="1200px" mx="auto">
        <Header />

        <chakra.div p={4}>{children}</chakra.div>
        <Spacer />

        <Footer />
      </Flex>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(String).isRequired,
};

export default Layout;
