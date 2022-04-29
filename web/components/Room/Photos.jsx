import { Box, Flex, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Photos({ roomData }) {
  return (
    <Flex
      minH="50vh"
      justify="center"
      flexDirection={['column', 'column', 'row']}
      // clipPath={['none', 'none', 'polygon(0 9vw, 100% 0, 100% calc(100% - 7vw), 0 100%)']}
      // marginTop="calc(0px - 9vw)"
    >
      <Box>
        <Image
          w="full"
          h="full"
          objectFit="cover"
          alt={`${roomData.name}'s big photo`}
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/room-features/${roomData.photos[0]}`}
        />
      </Box>
      <Box>
        <Image
          w="full"
          h="full"
          objectFit="cover"
          alt={`${roomData.name}'s big photo`}
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/room-features/${roomData.photos[1]}`}
        />
      </Box>
      <Box>
        <Image
          w="full"
          h="full"
          objectFit="cover"
          alt={`${roomData.name}'s big photo`}
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/room-features/${roomData.photos[2]}`}
        />
      </Box>
    </Flex>
  );
}

Photos.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default Photos;
