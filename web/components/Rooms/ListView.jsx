/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, Heading, HStack, IconButton, Spacer, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import { get } from '../../utils/apiHelper';
import webRoutes from '../../utils/webRoutes';
import CustomSpinner from '../CustomSpinner';
import RoomCard from './RoomCard';

function RoomsListView({ route }) {
  const [rooms, setRooms] = useState([]);
  const [maxFloor, setMaxFloor] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFloor, setCurrentFloor] = useState(1);

  useEffect(() => {
    // 1. Fetch all possible data, set the max floor, and remove the loading spinner.
    get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`)
      .then(({ data }) => setRooms(data))
      .then(() =>
        get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/floors`).then(({ data }) => {
          setMaxFloor(Math.max(...data.map((e) => e.number), 1));
          setIsLoading(false);
        })
      );
  }, []);

  // This is manual sorting. Edit this later with the API / backend for reduced overhead.
  const roomsInCurrentFloor = useMemo(
    () =>
      rooms
        .filter((room) => room.floor.number === currentFloor)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [rooms, currentFloor]
  );

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

      {isLoading ? (
        <CustomSpinner />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(9rem, 1fr))" gap={2}>
          {roomsInCurrentFloor.map((room) => (
            <NextLink
              key={room.slug}
              href={
                route === 'roomDetail'
                  ? webRoutes.roomDetail(room.slug)
                  : webRoutes.adminVisitorCreate(room.slug)
              }
              passHref
            >
              <a>
                <RoomCard roomData={room} />
              </a>
            </NextLink>
          ))}
        </Grid>
      )}
    </VStack>
  );
}

RoomsListView.propTypes = {
  route: PropTypes.oneOf(['roomDetail', 'visitors']).isRequired,
};

export default RoomsListView;
