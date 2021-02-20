import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import { get } from '../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const request = await get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${ctx.params.room}`
  );

  return {
    props: {
      roomData: request.data,
    },
  };
};

const RoomInfo = ({ roomData }) => {
  return (
    <Layout>
      <div>{`This is the page for ${roomData.name}.`}</div>
    </Layout>
  );
};

RoomInfo.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default RoomInfo;
