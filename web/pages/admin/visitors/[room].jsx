import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ControlledText from '../../../components/Admin/Forms/ControlledText';
import ControlledTextarea from '../../../components/Admin/Forms/ControlledTextarea';
import FormActions from '../../../components/Admin/Forms/FormActions';
import FormHeading from '../../../components/Admin/Forms/FormHeading';
import FormOverlay from '../../../components/Admin/Forms/FormOverlay';
import Layout from '../../../components/Layout';
import { FailedOperationToast, SuccessfulOperationToast } from '../../../components/Toasts';
import { get, post } from '../../../helpers/apiHelper';
import webRoutes from '../../../helpers/webRoutes';
import isAdministrator from '../../../utils/isAdministrator';

export const getServerSideProps = isAdministrator(async (ctx) => {
  const request = await get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${ctx.params.room}`
  );

  return {
    props: {
      roomData: request.data || null,
    },
  };
});

const VisitorsCreate = ({ roomData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiResponse = await post(
      { firstName, lastName, address, email, purpose, room: roomData._id, entity: 'visitors' },
      '/api/create'
    );

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
};

VisitorsCreate.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default VisitorsCreate;
