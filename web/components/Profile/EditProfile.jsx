import { Button, Grid, Heading, Icon, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';

import ControlledText from '../Admin/Forms/ControlledText';

const EditProfile = ({ userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [address, setAddress] = useState(userData.address);
  const [email, setEmail] = useState(userData.email);

  return (
    <VStack p={10} rounded="1rem" spacing={5} mt={10}>
      <Heading fontSize="2xl">✍️ EDIT PROFILE</Heading>

      <Grid w="full" templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={[5, 10]}>
        <ControlledText
          stateValue={username}
          stateDispatch={setUsername}
          formLabel="Username"
          formHelper="Your username that you use to register"
          formPlaceholder={username}
        />

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

      <Button colorScheme="yellow" size="lg" leftIcon={<Icon as={BsPencilSquare} />}>
        Edit My Profile
      </Button>
    </VStack>
  );
};

EditProfile.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

export default EditProfile;
