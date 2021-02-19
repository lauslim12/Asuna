import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import ListOfRooms from '../../components/ListOfRooms';

export async function getServerSideProps() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`);
  const { data } = response.data;

  return {
    props: {
      rooms: data,
    },
  };
}

const Rooms = ({ rooms }) => {
  return (
    <Layout>
      <ListOfRooms rooms={rooms} />
    </Layout>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.instanceOf(Object).isRequired,
};

export default Rooms;