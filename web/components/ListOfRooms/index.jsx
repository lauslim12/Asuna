import { HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import RoomCard from './RoomCard';

const ListOfRooms = ({ rooms }) => {
  return (
    <HStack spacing={5}>
      {rooms.map((room) => (
        <RoomCard key={room.slug} roomData={room} />
      ))}
    </HStack>
  );
};

ListOfRooms.propTypes = {
  rooms: PropTypes.instanceOf(Array).isRequired,
};

export default ListOfRooms;
