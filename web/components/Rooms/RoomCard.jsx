import { Center, Image, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const RoomCard = forwardRef(({ onClick, href, roomData }, ref) => {
  return (
    <a onClick={onClick} ref={ref} href={href}>
      <VStack
        align="stretch"
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
    </a>
  );
});

RoomCard.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  roomData: PropTypes.instanceOf(Object).isRequired,
};

RoomCard.defaultProps = {
  href: '',
  onClick: () => null,
};

export default RoomCard;
