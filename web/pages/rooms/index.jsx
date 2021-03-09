import Layout from '../../components/Layout';
import ListOfRooms from '../../components/ListOfRooms/ListView';

const Rooms = () => {
  return (
    <Layout title={['Rooms']}>
      <ListOfRooms route="roomDetail" />
    </Layout>
  );
};

export default Rooms;
