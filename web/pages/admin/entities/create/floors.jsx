import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ControlledNumber from '../../../../components/Forms/ControlledNumber';
import ControlledText from '../../../../components/Forms/ControlledText';
import FormActions from '../../../../components/Forms/FormActions';
import FormHeading from '../../../../components/Forms/FormHeading';
import FormOverlay from '../../../../components/Forms/FormOverlay';
import Layout from '../../../../components/Layout';
import { post } from '../../../../utils/apiHelper';
import webRoutes from '../../../../utils/webRoutes';
import withAdministrator from '../../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(() => {
  return {
    props: {},
  };
});

function CreateFloors() {
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiResponse = await post({ number, name, entity: 'floors' }, '/api/create');

    if (apiResponse.status === 'success') {
      toast({
        title: 'Successfully created!',
        description: 'Thank you! You will be redirected shortly.',
        status: 'success',
        isClosable: true,
      });

      return setTimeout(() => router.push(webRoutes.adminEntities('floors')), 1000);
    }

    return toast({
      title: 'Failed to create!',
      description: apiResponse.response.message,
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <Layout title={['Create Floor']}>
      <FormOverlay submitAction={handleSubmit}>
        <FormHeading formTitle="Create a new floor!" />

        <Text textAlign="center" fontSize="sm">
          Hello Owner! Please fill up some details first!
        </Text>

        <ControlledNumber
          stateValue={number}
          stateDispatch={setNumber}
          formLabel="Floor Number"
          formHelper="The floor number to input."
        />

        <ControlledText
          stateValue={name}
          stateDispatch={setName}
          formLabel="Floor Name"
          formHelper="The floor name."
          formPlaceholder="Name of the floor..."
        />

        <FormActions cancelPath={webRoutes.adminHomepage} />
      </FormOverlay>
    </Layout>
  );
}

export default CreateFloors;
