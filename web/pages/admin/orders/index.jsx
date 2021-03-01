import { Box, Wrap } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import OrderCardVertical from '../../../components/Admin/OrderCardVertical';
import Layout from '../../../components/Layout';
import { getAuth } from '../../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const { data } = await getAuth(
    `${process.env.PRIVATE_API_URL}/api/v1/orders/my-managed-orders`,
    token
  );

  return {
    props: {
      data,
    },
  };
};

const Admin = ({ data }) => {
  return (
    <Layout title={['Admin']}>
      <Box h="full" w="full">
        <Wrap p={3} spacing={7} justify="center">
          {data.map((el) => (
            <OrderCardVertical key={el._id} data={el} />
          ))}
        </Wrap>
      </Box>
    </Layout>
  );
};

Admin.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default Admin;
