import { Box, ListItem, OrderedList, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import Layout from '../components/Layout';
import webRoutes from '../helpers/webRoutes';

const Home = () => {
  return (
    <Layout title={['Home']}>
      <Text>This page is under construction.</Text>
      <Box mt={5}>
        <Text>All available pages (click):</Text>
        <OrderedList textDecoration="underline">
          <ListItem>
            <NextLink href={webRoutes.homepage}>Homepage</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.listOfRooms}>All Rooms</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.roomDetail('ganyu')}>A single example room</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.profile}>Profile</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.signIn}>Login</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.adminOrders}>Admin: See All Orders (done)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.adminHomepage}>Admin: Admin Homepage (done)</NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={webRoutes.adminEntities('rooms')}>
              Owner: See All Entities (Check One Entity) (room example)
            </NextLink>
          </ListItem>
        </OrderedList>
      </Box>
      <Box mt={5}>
        <Text>Pages not made yet</Text>
        <OrderedList textDecoration="underline">
          <ListItem>Register</ListItem>
          <ListItem>Admin: Accept Guests</ListItem>
          <ListItem>Owner: See Earnings</ListItem>
          <ListItem>Owner: Create Entities</ListItem>
        </OrderedList>
      </Box>
    </Layout>
  );
};

export default Home;
