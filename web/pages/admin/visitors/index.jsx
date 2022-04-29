import Layout from '../../../components/Layout';
import ListOfRooms from '../../../components/Rooms/ListView';
import withAdministrator from '../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(() => {
  return {
    props: {},
  };
});

function Visitors() {
  return (
    <Layout title={['Visitors']}>
      <ListOfRooms route="visitors" />
    </Layout>
  );
}

export default Visitors;
