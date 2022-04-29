import { Box, Heading, Image, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Hero({ roomData }) {
  return (
    <Box h="80vh" pos="relative">
      <Box
        w="full"
        h="full"
        pos="absolute"
        backgroundImage="linear-gradient(to right bottom, #7dd56f, #28b487)"
        opacity="0.85"
      >
        <VStack h="full" justify="center" color="white" textAlign="center">
          <Box>
            <Heading
              as="h1"
              backgroundImage="linear-gradient(to right bottom, #7dd56f, #28b487)"
              lineHeight={1}
              p={5}
              textTransform="uppercase"
              letterSpacing={5}
              fontWeight="0"
            >
              {roomData.name}
            </Heading>
          </Box>
          <Box>
            <Heading
              as="h2"
              textTransform="uppercase"
              backgroundImage="linear-gradient(to right bottom, #7dd56f, #28b487)"
              lineHeight={1}
              p={5}
              letterSpacing={5}
              fontWeight="0"
            >
              {roomData.type === 'office' ? 'Personal Office' : 'Coworking Space'}
            </Heading>
          </Box>
        </VStack>
      </Box>

      <Image
        w="full"
        h="full"
        src={`${process.env.NEXT_PUBLIC_API_URL}/images/room-features/${roomData.photos[0]}`}
        objectFit="cover"
        alt={`${roomData.name}'s big photo`}
        objectPosition="50% 25%"
      />
    </Box>
  );
}

Hero.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default Hero;
