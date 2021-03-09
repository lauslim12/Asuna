import Layout from '../../../components/Layout';
import ListOfRooms from '../../../components/ListOfRooms/ListView';
import isAdministrator from '../../../utils/isAdministrator';

export const getServerSideProps = isAdministrator(() => {
  return {
    props: {},
  };
});

const Visitors = () => {
  return (
    <Layout title={['Visitors']}>
      <ListOfRooms route="visitors" />
    </Layout>
  );
};

export default Visitors;
