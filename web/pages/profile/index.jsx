import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;

  try {
    apiResponse = await axios.get(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, {
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
        onClick={() => {
          // Has to be done like this so Vercel removes the cookie perfectly.
          axios
            .post('api/logout', { isLoggedOut: true })
            .then((res) => {
              if (res.data.status === 'success') {
                toast({
                  title: 'Successfully logged out!',
                  description: 'You will be redirected shortly...',
                  status: 'success',
                  isClosable: true,
                });

                return setTimeout(() => router.push('/'), 2000);
              }

              return null;
            })
            .catch(() => {
              toast({
                title: 'Failed to log out!',
                description: 'Something has happened. Please try again!',
                status: 'error',
                isClosable: true,
              });
            });
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
