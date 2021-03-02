import Layout from '../../../components/Layout';
import isAdministrator from '../../../utils/isAdministrator';

export const getServerSideProps = async (ctx) => isAdministrator(ctx);

const Visitors = () => {
  return <Layout title={['Visitors']} />;
};

export default Visitors;
