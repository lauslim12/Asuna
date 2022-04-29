import { Badge, Box, Heading, Image, useColorMode, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ProfileHeading({ userData }) {
  const { colorMode } = useColorMode();

  return (
    <VStack bg={colorMode === 'dark' ? 'green.500' : 'green.300'} p={10} rounded="1rem" spacing={5}>
      <Heading fontSize="2xl">👨‍💻 MY PROFILE</Heading>
      <Box>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/users/${userData.photo}`}
          h="100px"
          w="100px"
          borderRadius="full"
        />
      </Box>

      <VStack>
        <Heading fontSize="lg">{userData.username}</Heading>
        {userData.role === 'admin' ? (
          <Badge colorScheme="red">{userData.role}</Badge>
        ) : (
          <Badge colorScheme="blue">{userData.role}</Badge>
        )}
      </VStack>
    </VStack>
  );
}

ProfileHeading.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

export default ProfileHeading;
