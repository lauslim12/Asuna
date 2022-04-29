import { Box, Button, Flex, Heading, Icon, Image, Stack, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import webRoutes from '../../utils/webRoutes';

function Hero() {
  return (
    <Flex
      align="center"
      justify={['center', 'space-around', 'space-between']}
      direction={['column-reverse', 'column-reverse', 'row']}
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={16}
    >
      <Stack spacing={4} w={['100%', '100%', '40%']} align={['center', 'center', 'flex-start']}>
        <Heading as="h1" size="xl" fontWeight="bold" textAlign={['center', 'center', 'left']}>
          Be Productive With Us!
        </Heading>
        <Heading
          as="h2"
          size="md"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left']}
        >
          We are committed to making you feel the most productive at our building.
        </Heading>
        <Tooltip label="Click me to start!" hasArrow>
          <Button
            colorScheme="green"
            borderRadius="md"
            p={4}
            lineHeight={1}
            size="md"
            rightIcon={<Icon as={FaArrowRight} />}
          >
            <NextLink href={webRoutes.listOfRooms}>Click me to start</NextLink>
          </Button>
        </Tooltip>
      </Stack>
      <Box w={['100%', '60%', '50%']} mb={[12, 0]}>
        <Image src="hero.webp" size="100%" rounded="1rem" shadow="2xl" alt="Asuna's hero picture" />
      </Box>
    </Flex>
  );
}

export default Hero;
