import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { post } from '../../utils/apiHelper';
import UserContext from '../../utils/userContext';
import webRoutes from '../../utils/webRoutes';
import ControlledPassword from '../Forms/ControlledPassword';
import ControlledText from '../Forms/ControlledText';
import FormActions from '../Forms/FormActions';
import FormHeading from '../Forms/FormHeading';
import FormOverlay from '../Forms/FormOverlay';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(UserContext);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToBeSent = {
      username,
      password,
      requestType: 'POST',
      requestUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
    };

    const apiResponse = await post(dataToBeSent, '/api/login');

    if (apiResponse.status === 'success') {
      SuccessfulOperationToast(toast, 'Welcome! Please wait to be redirected to the homepage!');
      dispatch({ type: 'login' });

      return setTimeout(() => router.push('/'), 1000);
    }

    return FailedOperationToast(toast, apiResponse.message);
  };

  return (
    <FormOverlay submitAction={handleSubmit}>
      <FormHeading formTitle="Log in to your account!" />

      <Text textAlign="center" fontSize="sm">
        Hello! For us to provide better services, please login first!
      </Text>

      <ControlledText
        stateValue={username}
        stateDispatch={setUsername}
        formLabel="Username"
        formHelper="Your username that you used to register."
        formPlaceholder="PatrickStar1350"
      />

      <ControlledPassword
        stateValue={password}
        stateDispatch={setPassword}
        formLabel="Password"
        formHelper="Your password that you used to register."
        formPlaceholder="••••••••"
      />

      <FormActions cancelPath={webRoutes.homepage} />
    </FormOverlay>
  );
}

export default LoginForm;
