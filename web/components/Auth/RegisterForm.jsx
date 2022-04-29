import 'react-datepicker/dist/react-datepicker.css';

import { FormControl, FormLabel, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { post } from '../../utils/apiHelper';
import webRoutes from '../../utils/webRoutes';
import ControlledPassword from '../Forms/ControlledPassword';
import ControlledText from '../Forms/ControlledText';
import FormActions from '../Forms/FormActions';
import FormHeading from '../Forms/FormHeading';
import FormOverlay from '../Forms/FormOverlay';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToBeSent = {
      firstName,
      lastName,
      address,
      birthdate,
      email,
      username,
      password,
      passwordConfirm,
      requestUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`,
      requestType: 'POST',
    };

    const apiResponse = await post(dataToBeSent, '/api/authRequestHandler');

    if (apiResponse.status === 'success') {
      SuccessfulOperationToast(toast, 'Welcome! Please wait for a second to log in!');
      return setTimeout(() => router.push(webRoutes.signIn), 1000);
    }

    return FailedOperationToast(toast, apiResponse.message);
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

      <FormControl isRequired>
        <FormLabel htmlFor="birthdate">Birthdate</FormLabel>

        <div className={colorMode === 'dark' ? 'dark-theme' : 'light-theme'}>
          <ReactDatePicker
            id="birthdate"
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            className="react-datapicker__input-text"
          />
        </div>
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
        formLabel="Username"
        formHelper="Username to be used in this application."
        formPlaceholder="faizramdhani"
      />

      <ControlledPassword
        stateValue={password}
        stateDispatch={setPassword}
        formLabel="Password"
        formHelper="Your password to be associated with your account."
        formPlaceholder="••••••••"
      />

      <ControlledPassword
        stateValue={passwordConfirm}
        stateDispatch={setPasswordConfirm}
        formLabel="Confirm Password"
        formHelper="Confirm your password."
        formPlaceholder="••••••••"
      />

      <FormActions cancelPath={webRoutes.homepage} />
    </FormOverlay>
  );
}

export default RegisterForm;
