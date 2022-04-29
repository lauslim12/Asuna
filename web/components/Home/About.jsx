import { Box, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';

function About() {
  return (
    <VStack spacing={5} mb={16} px={8} minH="50vh">
      <Heading as="h1" size="xl" fontWeight="bold" letterSpacing="0.5rem" textAlign="center">
        OUR ROOMS
      </Heading>
      <Box bg="teal.400" mb={5} p={2} transform="skewX(-20deg)" rounded="sm">
        <Text align="center" fontWeight="bold" fontSize={['sm', 'md', 'lg']}>
          We provide unique rooms with colorful environments.
        </Text>
      </Box>

      <Stack spacing={4} w="full" direction={['column', 'column', 'row']} align="center">
        <Box w={['100%', '100%', '40%']} mb={[12, 0]}>
          <Image size="100%" borderRadius="md" shadow="2xl" src="office-1.webp" alt="Room 1" />
        </Box>
        <Box w={['100%', '100%', '40%']} mb={[12, 0]}>
          <Image size="100%" borderRadius="md" shadow="2xl" src="office-2.webp" alt="Room 2" />
        </Box>
        <Box w={['100%', '100%', '40%']} mb={[12, 0]}>
          <Image size="100%" borderRadius="md" shadow="2xl" src="office-3.webp" alt="Room 3" />
        </Box>
      </Stack>
    </VStack>
  );
}

export default About;
