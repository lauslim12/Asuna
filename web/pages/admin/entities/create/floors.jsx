import {
  Button,
  ButtonGroup,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../../../components/Layout';
import { post } from '../../../../helpers/apiHelper';
import webRoutes from '../../../../helpers/webRoutes';

const CreateFloors = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');
  const router = useRouter();
  const toast = useToast();

  return (
    <Layout title={['Create Floor']}>
      <VStack as="form" spacing={5}>
        <Heading fontSize="lg">Temporary Floor Creation Form</Heading>

        <FormControl>
          <Input
            type="number"
            id="number"
            placeholder="1"
            value={number}
            isRequired
            onChange={({ currentTarget: { value } }) => setNumber(value)}
          />
        </FormControl>

        <FormControl>
          <Input
            id="name"
            placeholder="Name of the floor..."
            value={name}
            isRequired
            onChange={({ currentTarget: { value } }) => setName(value)}
          />
        </FormControl>

        <ButtonGroup variant="outline" spacing={6}>
          <Button
            type="submit"
            colorScheme="blue"
            disabled={!name || !number}
            onClick={async (e) => {
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
            }}
          >
            Create
          </Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </VStack>
    </Layout>
  );
};

export default CreateFloors;
