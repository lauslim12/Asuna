import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ControlledText from '../../../components/Forms/ControlledText';
import ControlledTextarea from '../../../components/Forms/ControlledTextarea';
import FormActions from '../../../components/Forms/FormActions';
import FormHeading from '../../../components/Forms/FormHeading';
import FormOverlay from '../../../components/Forms/FormOverlay';
import Layout from '../../../components/Layout';
import { FailedOperationToast, SuccessfulOperationToast } from '../../../components/Toasts';
import { get, post } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';
import withAdministrator from '../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async (ctx) => {
  const request = await get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${ctx.params.room}`
  );

  return {
    props: {
      roomData: request.data || null,
    },
  };
});

function VisitorsCreate({ roomData }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToBeSent = {
      firstName,
      lastName,
      address,
      email,
      purpose,
      room: roomData._id,
      requestType: 'POST',
      requestUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/visitors`,
    };

    const apiResponse = await post(dataToBeSent, '/api/authRequestHandler');

    if (apiResponse.status === 'success') {
      SuccessfulOperationToast(toast, 'Successfully registered a new visitor!');

      return setTimeout(() => router.push(webRoutes.adminHomepage), 1000);
    }

    return FailedOperationToast(toast, apiResponse.response);
  };

  return (
    <Layout title={['Create Visitor']}>
      <FormOverlay submitAction={handleSubmit}>
        <FormHeading formTitle="Create a new visitor!" />

        <ControlledText
          stateValue={firstName}
          stateDispatch={setFirstName}
          formLabel="First Name"
          formHelper="The visitor's first name."
          formPlaceholder="Dzulfiqar"
        />

        <ControlledText
          stateValue={lastName}
          stateDispatch={setLastName}
          formLabel="Last Name"
          formHelper="The visitor's last name."
          formPlaceholder="Ramadhan"
        />

        <ControlledText
          stateValue={address}
          stateDispatch={setAddress}
          formLabel="Address"
          formHelper="The visitor's address."
          formPlaceholder="South Jakarta"
        />

        <ControlledText
          stateValue={email}
          stateDispatch={setEmail}
          formLabel="Email"
          formHelper="The visitor's email."
          formPlaceholder="dzulfiqar12@gmail.com"
        />

        <ControlledTextarea
          stateValue={purpose}
          stateDispatch={setPurpose}
          formLabel="Purpose"
          formHelper="The visitor's purpose to visit."
          formPlaceholder="Meeting at 16:00."
        />

        <FormActions cancelPath={webRoutes.homepage} />
      </FormOverlay>
    </Layout>
  );
}

VisitorsCreate.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default VisitorsCreate;
