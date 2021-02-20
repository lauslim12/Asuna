import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import { getAuth } from '../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;
  const response = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, token);

  if (response.status === 'error') {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {
      myData: response,
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
