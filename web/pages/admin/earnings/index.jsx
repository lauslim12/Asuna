import {
  Button,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from '../../../components/Layout';
import { getAuth } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';
import withAdministrator from '../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async (ctx) => {
  const token = ctx.req.cookies.jwt;
  const response = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/orders/earnings`, token);

  return {
    props: {
      data: response.data || [],
      total: response.total || 0,
    },
  };
});

function Earnings({ data, total }) {
  const router = useRouter();

  return (
    <Layout title={['Earnings']}>
      <VStack spacing={4}>
        <Stat align="center">
          <StatLabel>Total Earnings</StatLabel>
          <StatNumber>{`IDR ${total.toLocaleString('id')}`}</StatNumber>
          <StatHelpText>Lifetime</StatHelpText>
        </Stat>

        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Earnings for the lifetime of the application</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Price (IDR)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((income, index) => (
              <Tr key={income._id} fontSize="xs">
                <Td>{index + 1}</Td>
                <Td>{new Date(income.startDate).toISOString().split('T')[0]}</Td>
                <Td>{new Date(income.endDate).toISOString().split('T')[0]}</Td>
                <Td>{income.totalPrice.toLocaleString('id')}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>No.</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Price (IDR)</Th>
            </Tr>
          </Tfoot>
        </Table>

        <Button colorScheme="teal" size="sm" onClick={() => router.push(webRoutes.adminHomepage)}>
          Back to Admin Homepage
        </Button>
      </VStack>
    </Layout>
  );
}

Earnings.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  total: PropTypes.number.isRequired,
};

export default Earnings;
