import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import ListOfRooms from '../../components/ListOfRooms';

export async function getServerSideProps() {
  const responseRoom = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`);
  const responseFloor = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/floors`);

  const maxFloor = Math.max(...responseFloor.data.data.map((e) => e.number), 1);
  const { data } = responseRoom.data;

  return {
    props: {
      rooms: data,
      maxFloor,
    },
  };
}

const Rooms = ({ rooms, maxFloor }) => {
  return (
    <Layout>
      <ListOfRooms rooms={rooms} maxFloor={maxFloor} />
    </Layout>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.instanceOf(Object).isRequired,
  maxFloor: PropTypes.number.isRequired,
};

export default Rooms;
