import { Center, Image, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const RoomCard = ({ roomData }) => {
  return (
    <NextLink href={`/rooms/${roomData.slug}`} passHref>
      <VStack
        align="stretch"
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        spacing={2}
        cursor="pointer"
      >
        <Text fontSize="xs" textTransform="capitalize" textAlign="center">
          {roomData.type}
        </Text>

        <Center minH={0} flex={1}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${roomData.thumbnail}`}
            h="full"
            borderRadius="full"
          />
        </Center>

        <VStack spacing={2}>
          <Text>{roomData.name}</Text>
          <Text fontSize="xs">
            {`Rp. ${roomData.price.toLocaleString('id')} / ${
              roomData.type === 'coworking-space' ? 'hour' : 'month'
            }`}
          </Text>
        </VStack>
      </VStack>
    </NextLink>
  );
};

RoomCard.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default RoomCard;
