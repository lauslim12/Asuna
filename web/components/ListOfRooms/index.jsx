/**
 * Current maximum floor in this building is 2. Change in production. (Environment variable)
 */

import { Grid, Heading, HStack, IconButton, Spacer, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import RoomCard from './RoomCard';

const ListOfRooms = ({ rooms }) => {
  const [roomsInFloor, setRoomsInFloor] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(1);

  useEffect(() => {
    const roomsInCurrentFloor = rooms.filter((room) => room.floor.number === currentFloor);

    setRoomsInFloor(roomsInCurrentFloor);
  }, [rooms, currentFloor]);

  return (
    <VStack align="stretch" spacing={4}>
      <HStack>
        <Heading size="md">Rooms</Heading>
        <Spacer />
        <HStack spacing={2}>
          <Heading size="md">{`Floor ${currentFloor}`}</Heading>
          <IconButton
            aria-label="Previous floor"
            icon={<AiFillMinusCircle />}
            variant="outline"
            size="xs"
            onClick={() => setCurrentFloor((previousFloor) => Math.max(previousFloor - 1, 1))}
          />
          <IconButton
            aria-label="Next floor"
            icon={<AiFillPlusCircle />}
            variant="outline"
            size="xs"
            onClick={() => setCurrentFloor((previousFloor) => Math.min(previousFloor + 1, 2))}
          />
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(auto-fill, minmax(9rem, 1fr))" gap={2}>
        {roomsInFloor.map((room) => (
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
