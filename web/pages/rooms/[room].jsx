import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import BookingForm from '../../components/RoomDetail/BookingForm';
import Details from '../../components/RoomDetail/Details';
import Hero from '../../components/RoomDetail/Hero';
import Photos from '../../components/RoomDetail/Photos';
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

const RoomInfo = ({ roomData }) => (
  <Layout title={[roomData?.name || 'Room Not Found']}>
    {roomData ? (
      <>
        <Hero roomData={roomData} />
        <Details roomData={roomData} />
        <Photos roomData={roomData} />
        <BookingForm roomData={roomData} />
      </>
    ) : (
      <div>No such room exist.</div>
    )}
  </Layout>
);

RoomInfo.propTypes = {
  roomData: PropTypes.instanceOf(Object),
};

RoomInfo.defaultProps = {
  roomData: null,
};

export default RoomInfo;
