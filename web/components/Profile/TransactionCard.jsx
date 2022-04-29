import { Badge, Center, Image, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import currencyDisplay from '../../utils/currencyDisplay';
import dateDisplay from '../../utils/dateDisplay';

const renderBadges = (status) => {
  if (status === 'finished') {
    return <Badge colorScheme="green">{status}</Badge>;
  }

  if (status === 'cancelled') {
    return <Badge colorScheme="red">{status}</Badge>;
  }

  return <Badge colorScheme="twitter">{status}</Badge>;
};

function TransactionCard({ transaction }) {
  return (
    <VStack
      align="stretch"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      spacing={2}
    >
      <VStack>{renderBadges(transaction.status)}</VStack>

      <Center minH={0} flex={1}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${transaction.room.thumbnail}`}
          h="full"
          borderRadius="full"
        />
      </Center>

      <VStack spacing={2}>
        <Text>{transaction.room.name}</Text>
        <Text fontSize="xs">{currencyDisplay(transaction.totalPrice)}</Text>
      </VStack>

      <VStack>
        <Badge colorScheme="green">Start</Badge>
        <Text fontSize="xs">{dateDisplay(transaction.startDate)}</Text>

        <Badge colorScheme="blue">End</Badge>
        <Text fontSize="xs">{dateDisplay(transaction.endDate)}</Text>
      </VStack>
    </VStack>
  );
}

TransactionCard.propTypes = {
  transaction: PropTypes.instanceOf(Object).isRequired,
};

export default TransactionCard;
