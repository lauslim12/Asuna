import { FormControl, FormHelperText, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { post } from '../../helpers/apiHelper';
import webRoutes from '../../utils/webRoutes';
import ControlledText from '../Forms/ControlledText';
import FormActions from '../Forms/FormActions';
import FormHeading from '../Forms/FormHeading';
import FormOverlay from '../Forms/FormOverlay';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiResponse = await post(
      { firstName, lastName, address, birthdate, email, username, password, passwordConfirm },
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`
    );

    if (apiResponse.status === 'success') {
      SuccessfulOperationToast(toast, 'Welcome! Please wait for a second to log in...');
      return setTimeout(() => router.push(webRoutes.signIn), 1000);
    }

    return FailedOperationToast(toast, apiResponse.response);
  };

  return (
    <FormOverlay submitAction={handleSubmit}>
      <FormHeading formTitle="Register your account!" />

      <Text textAlign="center" fontSize="sm">
        Hello! For us to provide better services, please register first!
      </Text>

      <ControlledText
        stateValue={firstName}
        stateDispatch={setFirstName}
        formLabel="First Name"
        formHelper="Your first name."
        formPlaceholder="Faiz"
      />

      <ControlledText
        stateValue={lastName}
        stateDispatch={setLastName}
        formLabel="Last Name"
        formHelper="Your last name."
        formPlaceholder="Ramdhani"
      />

      <ControlledText
        stateValue={address}
        stateDispatch={setAddress}
        formLabel="Address"
        formHelper="Your address."
        formPlaceholder="South Jakarta"
      />

      <FormControl>
        <FormLabel>Birthdate</FormLabel>

        <input
          type="date"
          name="birthdate"
          onChange={({ currentTarget: { value } }) => setBirthdate(value)}
          required
        />
      </FormControl>

      <ControlledText
        stateValue={email}
        stateDispatch={setEmail}
        formLabel="Email"
        formHelper="Your email."
        formPlaceholder="faizramdhani@gmail.com"
      />

      <ControlledText
        stateValue={username}
        stateDispatch={setUsername}
        formLabel="Usernam"
        formHelper="Username to be used in this application."
        formPlaceholder="faizramdhani"
      />

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
        <FormHelperText fontSize="xs">
          Your password to be associated with your account.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="passwordC">Password Confirm</FormLabel>
        <Input
          textAlign="center"
          bg="white"
          id="passwordC"
          type="password"
          placeholder="••••••••"
          value={passwordConfirm}
          errorBorderColor="red.500"
          minLength={8}
          isInvalid={passwordConfirm.length < 8 && passwordConfirm.length > 0}
          onChange={({ currentTarget: { value } }) => setPasswordConfirm(value)}
          focusBorderColor="green.500"
          size="lg"
        />
        <FormHelperText fontSize="xs">Confirm your password.</FormHelperText>
      </FormControl>

      <FormActions cancelPath={webRoutes.homepage} />
    </FormOverlay>
  );
};

export default RegisterForm;
