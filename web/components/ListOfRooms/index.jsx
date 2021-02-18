import { Grid, Heading, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import RoomCard from './RoomCard';

const ListOfRooms = ({ rooms }) => {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">Rooms</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(9rem, 1fr))" gap={2}>
        {rooms.map((room) => (
          <RoomCard key={room.slug} roomData={room} />
        ))}
      </Grid>
    </VStack>
  );
};

ListOfRooms.propTypes = {
  rooms: PropTypes.instanceOf(Array).isRequired,
};

export default ListOfRooms;
