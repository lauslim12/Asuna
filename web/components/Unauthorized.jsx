import { Button, ButtonGroup, Heading, Icon, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaBackward, FaKey } from 'react-icons/fa';

import webRoutes from '../utils/webRoutes';

function Unauthorized() {
  const router = useRouter();

  return (
    <VStack h="70vh" spacing={7} justify="center">
      <Heading textAlign="center" fontSize={['md', 'xl']}>
        😥 You are not authorized to access this page! Please sign in as a privileged user!
      </Heading>

      <ButtonGroup>
        <Button
          colorScheme="green"
          leftIcon={<Icon as={FaKey} />}
          onClick={() => router.push(webRoutes.signIn)}
        >
          Sign In
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<Icon as={FaBackward} />}
          onClick={() => router.push(webRoutes.homepage)}
        >
          Home
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

export default Unauthorized;
