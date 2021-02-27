/* eslint-disable no-underscore-dangle */
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

import ControlledMultipleFiles from '../../../../components/Admin/Forms/ControlledMultipleFiles';
import ControlledNumber from '../../../../components/Admin/Forms/ControlledNumber';
import ControlledRadioGroup from '../../../../components/Admin/Forms/ControlledRadioGroup';
import ControlledSingleFile from '../../../../components/Admin/Forms/ControlledSingleFile';
import ControlledText from '../../../../components/Admin/Forms/ControlledText';
import ControlledTextarea from '../../../../components/Admin/Forms/ControlledTextarea';
import Layout from '../../../../components/Layout';
import { get, post, postAuth } from '../../../../helpers/apiHelper';
import webRoutes from '../../../../helpers/webRoutes';

export const getServerSideProps = async () => {
  const { data } = await get(`${process.env.PRIVATE_API_URL}/api/v1/floors`);

  return {
    props: {
      data,
    },
  };
};

const CreateFloors = ({ data }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roomFeatures, setRoomFeatures] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [photos, setPhotos] = useState('');
  const [price, setPrice] = useState(1);
  const [type, setType] = useState('office');
  const [floor, setFloor] = useState(data[0]._id);
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const bg = useColorModeValue('#fafafa');

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
      description: apiResponse.response.message,
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <Layout title={['Create Floor']}>
      <Flex
        as="form"
        borderRadius="md"
        direction="column"
        align="center"
        justify="center"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <VStack
          px={[7, 14]}
          py={[5, 10]}
          spacing={5}
          borderRadius="md"
          w={['full', 'full', '60%']}
          border={colorMode === 'light' ? '1px solid #000' : '1px solid #fff'}
          bg={bg}
        >
          <Heading
            textAlign="center"
            fontSize={['md', 'md', 'lg']}
            textTransform="uppercase"
            color="#4e54c8"
          >
            Create a new room!
          </Heading>

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
          />

          <ControlledMultipleFiles
            stateDispatch={setPhotos}
            formLabel="Room Pictures"
            formHelper="3 of the room pictures!"
          />

          <ControlledRadioGroup
            types={['office', 'coworking-space']}
            stateDispatch={setType}
            formLabel="Room Type"
            formHelper="The room type."
            defaultValue="office"
          />

          <FormControl isRequired>
            <FormLabel htmlFor="floor">Floor Number</FormLabel>
            <Select
              isRequired
              errorBorderColor="green.500"
              size="lg"
              onChange={({ currentTarget: { value } }) => setFloor(value)}
              value={floor}
            >
              {data.map((singleFloor) => (
                <option key={singleFloor._id} value={singleFloor._id}>
                  {singleFloor.number}
                </option>
              ))}
            </Select>

            <FormHelperText fontSize="xs">The floor number.</FormHelperText>
          </FormControl>

          <ControlledNumber
            stateValue={price}
            stateDispatch={setPrice}
            formLabel="Room Price"
            formHelper="The room price."
          />

          <ButtonGroup variant="outline" spacing={6}>
            <Button type="submit" leftIcon={<Icon as={IoCreateOutline} />} colorScheme="teal">
              Create
            </Button>
            <Button
              leftIcon={<Icon as={MdCancel} />}
              onClick={() => router.push(webRoutes.adminHomepage)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </VStack>
      </Flex>
    </Layout>
  );
};

CreateFloors.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CreateFloors;
