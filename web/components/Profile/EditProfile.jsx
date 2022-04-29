import { Button, Grid, Heading, Icon, useToast, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';

import { post } from '../../utils/apiHelper';
import ControlledText from '../Forms/ControlledText';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

function EditProfile({ userData }) {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [address, setAddress] = useState(userData.address);
  const [email, setEmail] = useState(userData.email);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToBeSent = {
      firstName,
      lastName,
      address,
      email,
      requestType: 'PATCH',
      requestUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update-me`,
    };

    const apiResponse = await post(dataToBeSent, '/api/authRequestHandler');

    if (apiResponse.status === 'success') {
      return SuccessfulOperationToast(toast, 'You have successfully updated your profile!');
    }

    return FailedOperationToast(toast, apiResponse.message);
  };

  return (
    <VStack p={10} rounded="1rem" spacing={5} mt={10}>
      <Heading fontSize="2xl">✍️ EDIT PROFILE</Heading>

      <Grid w="full" templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={[5, 10]}>
        <ControlledText
          stateValue={firstName}
          stateDispatch={setFirstName}
          formLabel="First Name"
          formHelper="Your first name"
          formPlaceholder={firstName}
        />

        <ControlledText
          stateValue={lastName}
          stateDispatch={setLastName}
          formLabel="Last Name"
          formHelper="Your last name"
          formPlaceholder={lastName}
        />

        <ControlledText
          stateValue={address}
          stateDispatch={setAddress}
          formLabel="Address"
          formHelper="Your place of residence"
          formPlaceholder={address}
        />

        <ControlledText
          stateValue={email}
          stateDispatch={setEmail}
          formLabel="Email"
          formHelper="Your contact email for us to contact"
          formPlaceholder={email}
        />
      </Grid>

      <Button
        colorScheme="yellow"
        size="lg"
        leftIcon={<Icon as={BsPencilSquare} />}
        onClick={handleSubmit}
      >
        Edit My Profile
      </Button>
    </VStack>
  );
}

EditProfile.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

export default EditProfile;
