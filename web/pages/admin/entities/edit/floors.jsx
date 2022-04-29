import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ControlledNumber from '../../../../components/Forms/ControlledNumber';
import ControlledText from '../../../../components/Forms/ControlledText';
import FormActions from '../../../../components/Forms/FormActions';
import FormHeading from '../../../../components/Forms/FormHeading';
import FormOverlay from '../../../../components/Forms/FormOverlay';
import Layout from '../../../../components/Layout';
import { get, post } from '../../../../utils/apiHelper';
import webRoutes from '../../../../utils/webRoutes';
import withAdministrator from '../../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async (ctx) => {
  const { data } = await get(`${process.env.PRIVATE_API_URL}/api/v1/floors/${ctx.query.id}`);

  if (!data) {
    return {
      redirect: {
        destination: webRoutes.adminHomepage,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
});

function EditFloors({ data }) {
  const [number, setNumber] = useState(data.number);
  const [name, setName] = useState(data.name);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiResponse = await post(
      {
        number,
        name,
        entity: 'floors',
        id: data._id,
        lastModified: new Date(Date.now()),
      },
      '/api/patch'
    );

    if (apiResponse.status === 'success') {
      toast({
        title: 'Successfully edited!',
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
        <FormHeading formTitle="Edit a floor!" />

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

        <FormActions cancelPath={webRoutes.adminEntities('floors')} />
      </FormOverlay>
    </Layout>
  );
}

EditFloors.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default EditFloors;
