import Layout from '../../components/Layout';
import Unauthorized from '../../components/Unauthorized';

const UnauthorizedPage = () => {
  return (
    <Layout title={['Not Logged In!']}>
      <Unauthorized />
    </Layout>
  );
};

export default UnauthorizedPage;
