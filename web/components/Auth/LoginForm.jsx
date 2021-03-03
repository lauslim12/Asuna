import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiLoginCircleFill, RiRewindFill } from 'react-icons/ri';

import { post } from '../../helpers/apiHelper';
import FormHeading from '../Admin/Forms/FormHeading';
import FormOverlay from '../Admin/Forms/FormOverlay';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiResponse = await post({ username, password }, '/api/login');

    if (apiResponse.status === 'success') {
      SuccessfulOperationToast(toast, 'Welcome! Please wait for a second...');
      return setTimeout(() => router.push('/'), 1000);
    }

    return FailedOperationToast(toast, apiResponse.response);
  };

  return (
    <FormOverlay submitAction={handleSubmit}>
      <FormHeading formTitle="Log in to your account!" />

      <Text textAlign="center" fontSize="sm">
        Hello! For us to provide better services, please login first!
      </Text>

      <FormControl isRequired>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          textAlign="center"
          bg="white"
          id="username"
          placeholder="PatrickStar1350..."
          value={username}
          onChange={({ currentTarget: { value } }) => setUsername(value)}
          focusBorderColor="green.500"
          size="lg"
        />
        <FormHelperText fontSize="xs">Your username that you used to register.</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          textAlign="center"
          bg="white"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          errorBorderColor="red.500"
          minLength={8}
          isInvalid={password.length < 8 && password.length > 0}
          onChange={({ currentTarget: { value } }) => setPassword(value)}
          focusBorderColor="green.500"
          size="lg"
        />
        <FormHelperText fontSize="xs">Your password that you used to register.</FormHelperText>
      </FormControl>

      <ButtonGroup variant="outline" spacing={6}>
        <Button
          leftIcon={<Icon as={RiLoginCircleFill} />}
          type="submit"
          colorScheme="teal"
          disabled={!username || !password || password.length < 8}
        >
          Sign In
        </Button>
        <Button leftIcon={<Icon as={RiRewindFill} />} colorScheme="blue">
          Cancel
        </Button>
      </ButtonGroup>
    </FormOverlay>
  );
};

export default LoginForm;
