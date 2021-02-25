import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import { get } from '../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const request = await get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${ctx.params.room}`
  );

  return {
    props: {
      roomData: request.data || null,
    },
  };
};

const RoomInfo = ({ roomData }) => {
  return (
    <Layout title={[roomData?.name || 'Room Not Found']}>
      {roomData ? (
        <div>{`This is the page for ${roomData.name}.`}</div>
      ) : (
        <div>No such room exist.</div>
      )}
    </Layout>
  );
};

RoomInfo.propTypes = {
  roomData: PropTypes.instanceOf(Object),
};

RoomInfo.defaultProps = {
  roomData: null,
};

export default RoomInfo;
