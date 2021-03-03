import { Grid, Heading, HStack, IconButton, Spacer, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import webRoutes from '../../helpers/webRoutes';
import RoomCard from './RoomCard';

const RoomsListView = ({ rooms, maxFloor, route }) => {
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
            onClick={() => setCurrentFloor((prevFloor) => Math.max(prevFloor - 1, 1))}
          />
          <IconButton
            aria-label="Next floor"
            icon={<AiFillPlusCircle />}
            variant="outline"
            size="xs"
            onClick={() => setCurrentFloor((prevFloor) => Math.min(prevFloor + 1, maxFloor))}
          />
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(auto-fill, minmax(9rem, 1fr))" gap={2}>
        {roomsInFloor.map((room) => (
          <NextLink
            key={room.slug}
            href={
              route === 'roomDetail'
                ? webRoutes.roomDetail(room.slug)
                : webRoutes.adminVisitorCreate(room.slug)
            }
            passHref
          >
            <RoomCard roomData={room} />
          </NextLink>
        ))}
      </Grid>
    </VStack>
  );
};

RoomsListView.propTypes = {
  rooms: PropTypes.instanceOf(Array).isRequired,
  maxFloor: PropTypes.number.isRequired,
  route: PropTypes.oneOf(['roomDetail', 'visitors']).isRequired,
};

export default RoomsListView;
