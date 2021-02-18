import { Box, HStack, Spacer } from '@chakra-ui/react';

const Header = () => {
  return (
    <HStack p={3} spacing={2} bg="gray.700" color="white">
      <Box>
        <p>Logo.</p>
      </Box>

      <Spacer />

      <Box>
        <p>Profile.</p>
      </Box>
    </HStack>
  );
};

export default Header;
