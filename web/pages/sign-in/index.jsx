import {
  Button,
  ButtonGroup,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../components/Layout';

const signIn = async (username, password) => {
  let apiResponse;

  try {
    apiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
  } catch (err) {
    apiResponse = err.response;
  }

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
            autoComplete="username"
            value={username}
            onChange={({ currentTarget: { value } }) => setUsername(value)}
          />
        </FormControl>

        <FormControl>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </FormControl>

        <ButtonGroup variant="outline" spacing={6}>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={async (e) => {
              e.preventDefault();

              const response = await signIn(username, password);

              if (response.data.status === 'success') {
                toast({
                  title: 'Successful login!',
                  description: 'Welcome!',
                  status: 'success',
                  isClosable: true,
                });

                return setTimeout(() => router.push('/'));
              }

              return toast({
                title: 'Failed to login!',
                description: response.data.message,
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
