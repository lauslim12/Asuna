import { Center, Image, Text, useColorMode, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function RoomCard({ roomData }) {
  const { colorMode } = useColorMode();
  const darkHover = {
    background: 'gray.700',
    cursor: 'pointer',
  };
  const lightHover = {
    background: 'gray.300',
    cursor: 'pointer',
  };

  return (
    <VStack
      align="stretch"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      spacing={2}
      cursor="pointer"
      _hover={colorMode === 'dark' ? darkHover : lightHover}
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
  );
}

RoomCard.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default RoomCard;
