import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import EditProfile from '../../components/Profile/EditProfile';
import LogoutArea from '../../components/Profile/LogoutArea';
import ProfileHeading from '../../components/Profile/ProfileHeading';
import TransactionHistory from '../../components/Profile/TransactionHistory';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;
  let orderResponse;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  try {
    apiResponse = await axios.get(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    orderResponse = await axios.get(`${process.env.PRIVATE_API_URL}/api/v1/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {
      myData: apiResponse.data,
      myOrders: orderResponse.data,
    },
  };
};

const Profile = ({ myData, myOrders }) => (
  <Layout title={['Profile']}>
    <ProfileHeading userData={myData.data} />
    <EditProfile userData={myData.data} />
    <TransactionHistory userHistory={myOrders.data} />
    <LogoutArea />
  </Layout>
);

Profile.propTypes = {
  myData: PropTypes.instanceOf(Object).isRequired,
  myOrders: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;
