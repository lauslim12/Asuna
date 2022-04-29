import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ControlledMultipleFiles from '../../../../components/Forms/ControlledMultipleFiles';
import ControlledNumber from '../../../../components/Forms/ControlledNumber';
import ControlledRadioGroup from '../../../../components/Forms/ControlledRadioGroup';
import ControlledSelect from '../../../../components/Forms/ControlledSelect';
import ControlledSingleFile from '../../../../components/Forms/ControlledSingleFile';
import ControlledText from '../../../../components/Forms/ControlledText';
import ControlledTextarea from '../../../../components/Forms/ControlledTextarea';
import FormActions from '../../../../components/Forms/FormActions';
import FormHeading from '../../../../components/Forms/FormHeading';
import FormOverlay from '../../../../components/Forms/FormOverlay';
import Layout from '../../../../components/Layout';
import { get, post, postAuth } from '../../../../utils/apiHelper';
import webRoutes from '../../../../utils/webRoutes';
import withAdministrator from '../../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async () => {
  const { data } = await get(`${process.env.PRIVATE_API_URL}/api/v1/floors`);

  return {
    props: {
      data,
    },
  };
});

function CreateFloors({ data }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roomFeatures, setRoomFeatures] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [photos, setPhotos] = useState('');
  const [price, setPrice] = useState(1);
  const [type, setType] = useState('office');
  const [floor, setFloor] = useState(data[0]._id);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process 'roomFeatures' by Regular Expressions.
    const features = roomFeatures.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    // Only allow 3 files in 'roomPhotos'.
    if (photos.length > 3) {
      return toast({
        title: 'Failed to upload picture!',
        description: 'You can only select 3 photos for a room!',
        status: 'error',
        isClosable: true,
      });
    }

    // Create a 'FormData' to handle submissions.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('roomFeatures', features);
    formData.append('thumbnail', thumbnail);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('floor', floor);

    if (features.length > 0) {
      features.forEach((feature) => formData.append('roomFeatures', feature));
    }

    // 'FileList' cannot be iterated with 'forEach' as it is not an Array.
    // We have to transform it into an array first.
    [...photos].forEach((photo) => formData.append('photos', photo));

    // Check for authorization first before uploading.
    // Next.js does not support 'FormData' in its API route.
    // A bit dangerous. Would have to refactor later.
    const authResponse = await post({ key: 'upload_key' }, '/api/checkAuth');

    if (authResponse.status === 'fail') {
      return toast({
        title: 'Failed to fetch cookie!',
        description: 'Failed to fetch cookie! Please contact your system admin.',
        status: 'error',
        isClosable: true,
      });
    }

    const apiResponse = await postAuth(
      formData,
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`,
      authResponse.token
    );

    if (apiResponse.status === 'success') {
      toast({
        title: 'Successfully created!',
        description: 'Thank you! You will be redirected shortly.',
        status: 'success',
        isClosable: true,
      });

      return setTimeout(() => router.push(webRoutes.adminEntities('rooms')), 1000);
    }

    return toast({
      title: 'Failed to create!',
      description: apiResponse.message,
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <Layout title={['Create Room']}>
      <FormOverlay submitAction={handleSubmit}>
        <FormHeading formTitle="Create a new room!" />
        <Text textAlign="center" fontSize="sm">
          Hello Owner! Please fill up some details first!
        </Text>

        <ControlledText
          stateValue={name}
          stateDispatch={setName}
          formLabel="Room Name"
          formHelper="The room name."
          formPlaceholder="Name of the floor..."
        />

        <ControlledTextarea
          stateValue={description}
          stateDispatch={setDescription}
          formLabel="Room Description"
          formHelper="The room description."
          formPlaceholder="My awesome room!"
        />

        <ControlledText
          stateValue={roomFeatures}
          stateDispatch={setRoomFeatures}
          formLabel="Room Features"
          formHelper="The rooms features. Split by commas, no spaces."
          formPlaceholder="Beautiful room,Full of dolls!"
        />

        <ControlledSingleFile
          stateDispatch={setThumbnail}
          formLabel="Room Thumbnail"
          formHelper="The room thumbnail."
          isRequired
        />

        <ControlledMultipleFiles
          stateDispatch={setPhotos}
          formLabel="Room Pictures"
          formHelper="3 of the room pictures!"
          isRequired
        />

        <ControlledRadioGroup
          types={['office', 'coworking-space']}
          stateDispatch={setType}
          formLabel="Room Type"
          formHelper="The room type."
          defaultValue={type}
        />

        <ControlledSelect
          stateValue={floor}
          stateDispatch={setFloor}
          formLabel="Floor Number"
          formHelper="The floor number"
          optionValues={data}
          keyToDisplay="number"
        />

        <ControlledNumber
          stateValue={price}
          stateDispatch={setPrice}
          formLabel="Room Price"
          formHelper="The room price."
        />

        <FormActions cancelPath={webRoutes.adminHomepage} />
      </FormOverlay>
    </Layout>
  );
}

CreateFloors.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CreateFloors;
