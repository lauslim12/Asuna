import { Box, ListItem, OrderedList, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout title={['Home']}>
      <Text>This page is under construction.</Text>
      <Box mt={5}>
        <Text>All available pages (click):</Text>
        <OrderedList textDecoration="underline">
          <ListItem>
            <NextLink href="/">Homepage (NG)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/rooms">All Rooms (G)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/rooms/ganyu">A single example room (NG)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/profile">Profile (must be logged in) (NG)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/sign-in">Login (NG)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/admin/orders">Admin: See All Orders (done)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/admin">Admin: Admin Homepage (done)</NextLink>
          </ListItem>
        </OrderedList>
      </Box>
      <Box mt={5}>
        <Text>Pages not made yet</Text>
        <OrderedList textDecoration="underline">
          <ListItem>Register</ListItem>
          <ListItem>Admin: Accept Guests</ListItem>
          <ListItem>Owner: See Earnings</ListItem>
          <ListItem>Owner: See All Entities</ListItem>
          <ListItem>Owner: Create Entities</ListItem>
        </OrderedList>
      </Box>
    </Layout>
  );
};

export default Home;
