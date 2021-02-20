import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import ListOfRooms from '../../components/ListOfRooms';
import { get } from '../../helpers/apiHelper';

export const getServerSideProps = async () => {
  const roomRequest = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`);
  const floorRequest = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/floors`);

  const maxFloor = Math.max(...floorRequest.data.map((e) => e.number), 1);

  return {
    props: {
      rooms: roomRequest.data,
      maxFloor,
    },
  };
};

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
