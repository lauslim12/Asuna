import Layout from '../../components/Layout';
import ListOfRooms from '../../components/Rooms/ListView';

function Rooms() {
  return (
    <Layout title={['Rooms']}>
      <ListOfRooms route="roomDetail" />
    </Layout>
  );
}

export default Rooms;
