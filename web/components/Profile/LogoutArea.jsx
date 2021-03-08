import { Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { post } from '../../helpers/apiHelper';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

const LogoutArea = () => {
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    // Has to be done like this so Vercel removes the cookie perfectly.
    post({ isLoggedOut: true }, '/api/logout')
      .then((response) => {
        if (response.status === 'success') {
          SuccessfulOperationToast(toast, 'You will be redirected shortly.');
          return setTimeout(() => router.push('/'), 2000);
        }

        return null;
      })
      .catch(() => FailedOperationToast(toast, 'Failed to log out! Please try again later!'));
  };

  return (
    <VStack p={10} rounded="1rem" spacing={5}>
      <Heading fontSize="2xl">✈️ LOGGING OUT</Heading>

      <Button colorScheme="messenger" w="200px" rounded="5rem" onClick={handleLogout}>
        Logout
      </Button>
    </VStack>
  );
};

export default LogoutArea;
