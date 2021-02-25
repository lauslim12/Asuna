import { Box } from '@chakra-ui/react';

import OrderCardHorizontal from '../../../components/Admin/OrderCardHorizontal';
import OrderCardHorizontalTwo from '../../../components/Admin/OrderCardHorizontalTwo';
import OrderCardVertical from '../../../components/Admin/OrderCardVertical';
import Layout from '../../../components/Layout';

const Admin = () => {
  return (
    <Layout title={['Admin']}>
      <Box h="full" w="full" bg="#fafafa">
        <OrderCardVertical />
        <OrderCardHorizontal />
        <OrderCardHorizontalTwo />
      </Box>
    </Layout>
  );
};

export default Admin;
