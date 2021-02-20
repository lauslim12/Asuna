import {
  Button,
  ButtonGroup,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../components/Layout';
import { post } from '../../helpers/apiHelper';

const signIn = async (username, password) => {
  const apiResponse = await post({ username, password }, 'api/login');

  return apiResponse;
};

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  return (
    <Layout>
      <VStack as="form" spacing={5}>
        <Heading fontSize="lg">Temporary Sign In Form</Heading>

        <FormControl>
          <Input
            id="username"
            placeholder="Username"
            value={username}
            isRequired
            onChange={({ currentTarget: { value } }) => setUsername(value)}
          />
        </FormControl>

        <FormControl>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            errorBorderColor="red.500"
            minLength={8}
            isRequired
            isInvalid={password.length < 8 && password.length > 0}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </FormControl>

        <ButtonGroup variant="outline" spacing={6}>
          <Button
            type="submit"
            colorScheme="blue"
            disabled={!username || !password || password.length < 8}
            onClick={async (e) => {
              e.preventDefault();

              const apiResponse = await signIn(username, password);

              if (apiResponse.status === 'success') {
                toast({
                  title: 'Successful login!',
                  description: 'Welcome!',
                  status: 'success',
                  isClosable: true,
                });

                return setTimeout(() => router.push('/'), 1000);
              }

              return toast({
                title: 'Failed to login!',
                description: apiResponse.response.message,
                status: 'error',
                isClosable: true,
              });
            }}
          >
            Sign In
          </Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </VStack>
    </Layout>
  );
};

export default SignIn;
