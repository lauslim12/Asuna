import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import TransactionCard from './TransactionCard';

function TransactionHistory({ userHistory }) {
  return (
    <Box p={10}>
      <Heading fontSize="2xl" p={5} textAlign="center">
        💴 MY TRANSACTIONS
      </Heading>

      {userHistory.length === 0 ? (
        <Text textAlign="center">You do not have any transactions yet.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(9rem, 1fr))" gap={2}>
          {userHistory.map((history) => (
            <TransactionCard key={history._id} transaction={history} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

TransactionHistory.propTypes = {
  userHistory: PropTypes.instanceOf(Object).isRequired,
};

export default TransactionHistory;
