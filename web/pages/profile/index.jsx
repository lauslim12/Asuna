import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;
  let response;

  try {
    response = await axios.get(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      myData: response.data,
    },
  };
};

const Profile = ({ myData }) => {
  console.log(myData);

  return (
    <Layout>
      <div>Test</div>
    </Layout>
  );
};

Profile.propTypes = {
  myData: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;
