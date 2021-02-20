import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
        destination: '/sign-in',
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
  const toast = useToast();
  const router = useRouter();
  console.log(myData);

  return (
    <Layout>
      <div>Test</div>
      <Button
        onClick={async () => {
          await axios.get('api/logout');

          toast({
            title: 'Successfully logged out!',
            description: 'You will be redirected shortly...',
            status: 'success',
            isClosable: true,
          });

          return setTimeout(() => router.push('/'), 1000);
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};

Profile.propTypes = {
  myData: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;
