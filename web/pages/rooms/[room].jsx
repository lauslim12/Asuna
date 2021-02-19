import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';

export async function getServerSideProps(ctx) {
  const request = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${ctx.params.room}`
  );
  const { data } = request.data;

  return {
    props: {
      roomData: data,
    },
  };
}

const RoomInfo = ({ roomData }) => {
  const room = roomData.data;

  console.log(room);

  return (
    <Layout>
      <div>{`This is the page for ${room.name}.`}</div>
    </Layout>
  );
};

RoomInfo.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default RoomInfo;
