import { chakra, HStack, Icon, Link, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => (
  <VStack as="footer" align="stretch" p={3} spacing={1} color="gray.500">
    <chakra.div fontSize="xs" textAlign="center">
      <Text>
        Asuna is an open-source, full-stack web application to manage a scalable building.
      </Text>
    </chakra.div>

    <HStack spacing={4} justify="center">
      <Tooltip label="GitHub">
        <Link href="https://github.com/lauslim12/Asuna" isExternal>
          <Icon as={FaGithub} />
        </Link>
      </Tooltip>
      <Tooltip label="nicholasdw.com">
        <Link href="https://nicholasdw.com" isExternal>
          <Icon as={FaHeart} />
        </Link>
      </Tooltip>
    </HStack>
  </VStack>
);

export default Footer;
