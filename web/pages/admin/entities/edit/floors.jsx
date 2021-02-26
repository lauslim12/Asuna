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
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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

import Layout from '../../../../components/Layout';
import { get, post } from '../../../../helpers/apiHelper';
import webRoutes from '../../../../helpers/webRoutes';

export const getServerSideProps = async (ctx) => {
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
};

const EditFloors = ({ data }) => {
  const [number, setNumber] = useState(data.number);
  const [name, setName] = useState(data.name);
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const bg = useColorModeValue('#fafafa');

  return (
    <Layout title={['Create Floor']}>
      <Flex as="form" borderRadius="md" direction="column" align="center" justify="center">
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
            Edit a floor!
          </Heading>

          <Text textAlign="center" fontSize="sm">
            Hello Owner! Please fill up some details first!
          </Text>

          <FormControl isRequired>
            <FormLabel htmlFor="number">Floor Number</FormLabel>
            <NumberInput
              id="number"
              defaultValue={1}
              min={1}
              max={20}
              onChange={(value) => setNumber(value)}
              focusBorderColor="green.500"
              size="lg"
              value={number}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormHelperText fontSize="xs">The floor number.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Floor Name</FormLabel>
            <Input
              id="name"
              autoComplete="off"
              placeholder="Name of the floor..."
              value={name}
              onChange={({ currentTarget: { value } }) => setName(value)}
              focusBorderColor="green.500"
              size="lg"
            />

            <FormHelperText fontSize="xs">The floor name.</FormHelperText>
          </FormControl>

          <ButtonGroup variant="outline" spacing={6}>
            <Button
              type="submit"
              leftIcon={<Icon as={IoCreateOutline} />}
              colorScheme="teal"
              disabled={!name || !number}
              onClick={async (e) => {
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
              }}
            >
              Edit
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

EditFloors.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default EditFloors;
