import { Badge, Box, Heading, HStack, Spacer, Text, useColorMode, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TransactionHistory = ({ userHistory }) => {
  const { colorMode } = useColorMode();

  return (
    <Box p={10}>
      <Heading fontSize="2xl" p={5} textAlign="center">
        💴 MY TRANSACTIONS
      </Heading>

      <HStack w="full" bg="gray.200" p={5} roundedTop="1rem" fontSize={['xs', 'md']} color="black">
        <Text>Room</Text>
        <Spacer />
        <Text>Start Date</Text>
        <Spacer />
        <Text>End Date</Text>
        <Spacer />
        <Text>Status</Text>
      </HStack>

      <VStack spacing={5} color="black">
        {userHistory.map((history) => (
          <HStack
            w="full"
            bg={colorMode === 'dark' ? 'red.500' : 'red.300'}
            p={5}
            roundedBottom="1rem"
            fontSize={['xs', 'md']}
          >
            <Text>{history.room.name}</Text>
            <Spacer />
            <Text>{new Date(history.startDate).toISOString().split('T')[0]}</Text>
            <Spacer />
            <Text>{new Date(history.endDate).toISOString().split('T')[0]}</Text>
            <Spacer />
            {history.status === 'ordered' || history.status === 'cancelled' ? (
              <Badge colorScheme="yellow">{history.status}</Badge>
            ) : (
              <Badge colorScheme="green">{history.status}</Badge>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

TransactionHistory.propTypes = {
  userHistory: PropTypes.instanceOf(Object).isRequired,
};

export default TransactionHistory;
