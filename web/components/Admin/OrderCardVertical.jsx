/* eslint-disable no-underscore-dangle */
import {
  Badge,
  Button,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
  VStack,
  WrapItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { post } from '../../helpers/apiHelper';
import webRoutes from '../../helpers/webRoutes';

const OrderCardVertical = ({ data }) => {
  const toast = useToast();
  const router = useRouter();

  const changeOrderStatus = async (status, orderId) => {
    const apiResponse = await post({ status, orderId }, '/api/changeOrder');

    return apiResponse;
  };

  return (
    <WrapItem>
      <Stack
        direction="column"
        p={4}
        spacing={5}
        justify="center"
        align="center"
        borderWidth={1}
        borderColor="white"
        borderRadius="md"
        boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
        textAlign="center"
      >
        <Badge colorScheme="messenger">{`ID: ${data._id}`}</Badge>

        <VStack spacing={2}>
          <Badge fontSize="sm" colorScheme="orange">
            Order Details:
          </Badge>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${data.room.thumbnail}`}
            h="full"
            borderRadius="full"
          />
          <Text>{data.room.name}</Text>
          <Badge colorScheme="green">{data.status}</Badge>
        </VStack>

        <VStack>
          <Heading fontSize="sm">Start/End Date</Heading>
          <HStack spacing={3}>
            <Badge fontSize="sm" colorScheme="red">
              {new Date(data.startDate).toISOString().split('T')[0]}
            </Badge>
            <Badge fontSize="sm" colorScheme="linkedin">
              {new Date(data.endDate).toISOString().split('T')[0]}
            </Badge>
          </HStack>
        </VStack>

        <VStack spacing={3}>
          <Heading fontSize="sm">Buyer</Heading>
          <Badge colorScheme="linkedin">{`${data.user.firstName} ${data.user.lastName}`}</Badge>
          <Heading fontSize="sm">Total Price</Heading>
          <Badge colorScheme="orange">{`Rp. ${data.totalPrice}`}</Badge>
          <Heading fontSize="sm">Associated Employee</Heading>
          <Badge colorScheme="green">{data.employee === null ? 'No Employee' : 'You'}</Badge>
        </VStack>

        <HStack>
          <Menu>
            <MenuButton as={Button} size="xs" colorScheme="green">
              Change Status
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={async (e) => {
                  e.preventDefault();

                  const apiResponse = await changeOrderStatus('processed', data._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now yours to manage! Redirecting shortly...',
                      status: 'success',
                      isClosable: true,
                    });

                    return setTimeout(() => router.push(webRoutes.adminOrders), 5000);
                  }

                  return toast({
                    title: 'Failed to process!',
                    description: apiResponse.response.message,
                    status: 'error',
                    isClosable: true,
                  });
                }}
              >
                Processed
              </MenuItem>
              <MenuItem
                onClick={async (e) => {
                  e.preventDefault();

                  const apiResponse = await changeOrderStatus('accepted', data._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now accepted! Redirecting shortly...',
                      status: 'success',
                      isClosable: true,
                    });

                    return setTimeout(() => router.push(webRoutes.adminOrders), 5000);
                  }

                  return toast({
                    title: 'Failed to process!',
                    description: apiResponse.response.message,
                    status: 'error',
                    isClosable: true,
                  });
                }}
              >
                Accepted
              </MenuItem>
              <MenuItem
                onClick={async (e) => {
                  e.preventDefault();

                  const apiResponse = await changeOrderStatus('finished', data._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now finished! Redirecting shortly...',
                      status: 'success',
                      isClosable: true,
                    });

                    return setTimeout(() => router.push(webRoutes.adminOrders), 5000);
                  }

                  return toast({
                    title: 'Failed to process!',
                    description: apiResponse.response.message,
                    status: 'error',
                    isClosable: true,
                  });
                }}
              >
                Finished
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            size="xs"
            colorScheme="red"
            onClick={async (e) => {
              e.preventDefault();

              const apiResponse = await changeOrderStatus('cancelled', data._id);

              if (apiResponse.status === 'success') {
                toast({
                  title: 'Successfully updated!',
                  description: 'This order is now cancelled! Redirecting shortly...',
                  status: 'success',
                  isClosable: true,
                });

                return setTimeout(() => router.push(webRoutes.adminOrders), 5000);
              }

              return toast({
                title: 'Failed to process!',
                description: apiResponse.response.message,
                status: 'error',
                isClosable: true,
              });
            }}
          >
            Cancel Request
          </Button>
        </HStack>
      </Stack>
    </WrapItem>
  );
};

OrderCardVertical.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default OrderCardVertical;
