/* eslint-disable no-underscore-dangle */
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
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
  const [price, setPrice] = useState(0);
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
    let apiResponse;

    if (authResponse.status === 'success') {
      apiResponse = await postAuth(
        formData,
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`,
        authResponse.token
      );
    }

    console.log(apiResponse);
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

          <FormControl isRequired>
            <FormLabel htmlFor="name">Room Name</FormLabel>
            <Input
              id="name"
              autoComplete="off"
              placeholder="Name of the floor..."
              value={name}
              onChange={({ currentTarget: { value } }) => setName(value)}
              focusBorderColor="green.500"
              size="lg"
            />

            <FormHelperText fontSize="xs">The room name.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="description">Room Description</FormLabel>
            <Textarea
              id="description"
              autoComplete="off"
              placeholder="My awesome room!"
              value={description}
              onChange={({ currentTarget: { value } }) => setDescription(value)}
              focusBorderColor="green.500"
              size="lg"
              isRequired
            />

            <FormHelperText fontSize="xs">The room description.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="features">Room Features</FormLabel>
            <Textarea
              id="features"
              autoComplete="off"
              placeholder="Beautiful room,life enjoyment!"
              value={roomFeatures}
              onChange={({ currentTarget: { value } }) => setRoomFeatures(value)}
              focusBorderColor="green.500"
              size="lg"
              isRequired
            />

            <FormHelperText fontSize="xs">
              The room features. Split features by commas, no spaces.
            </FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="room-type">Room Thumbnail</FormLabel>
            <input
              id="room-type"
              type="file"
              onChange={({ currentTarget: { files } }) => setThumbnail(files[0])}
            />

            <FormHelperText fontSize="xs">The room thumbnail.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="room-pictures">Room Pictures</FormLabel>
            <input
              id="room-pictures"
              type="file"
              onChange={({ currentTarget: { files } }) => setPhotos(files)}
              multiple
            />

            <FormHelperText fontSize="xs">3 of the room pictures!</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <RadioGroup defaultValue="office" onChange={setType}>
              <FormLabel htmlFor="room-type">Room Type</FormLabel>
              <HStack spacing={5}>
                <Radio colorScheme="red" value="office">
                  Office
                </Radio>
                <Radio colorScheme="green" value="coworking-space">
                  Coworking-Space
                </Radio>
              </HStack>
            </RadioGroup>

            <FormHelperText fontSize="xs">The room type.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="floor">Floor Number</FormLabel>
            <Select isRequired errorBorderColor="green.500" size="lg">
              {data.map((singleFloor) => (
                <option value={singleFloor._id} onChange={(value) => setFloor(value)}>
                  {singleFloor.number}
                </option>
              ))}
            </Select>

            <FormHelperText fontSize="xs">The floor number.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="price">Room Price</FormLabel>
            <NumberInput
              id="price"
              defaultValue={1}
              min={1}
              onChange={(value) => setPrice(value)}
              focusBorderColor="green.500"
              size="lg"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormHelperText fontSize="xs">The room price.</FormHelperText>
          </FormControl>

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
