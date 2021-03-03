import PropTypes from 'prop-types';

import Layout from '../../../components/Layout';
import ListOfRooms from '../../../components/ListOfRooms/ListView';
import { get } from '../../../helpers/apiHelper';
import isAdministrator from '../../../utils/isAdministrator';

export const getServerSideProps = isAdministrator(async () => {
  const roomRequest = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`);
  const floorRequest = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/floors`);

  const maxFloor = Math.max(...floorRequest.data.map((e) => e.number), 1);

  return {
    props: {
      rooms: roomRequest.data,
      maxFloor,
    },
  };
});

const Visitors = ({ rooms, maxFloor }) => {
  return (
    <Layout title={['Visitors']}>
      <ListOfRooms rooms={rooms} maxFloor={maxFloor} route="visitors" />
    </Layout>
  );
};

Visitors.propTypes = {
  rooms: PropTypes.instanceOf(Object).isRequired,
  maxFloor: PropTypes.number.isRequired,
};

export default Visitors;
