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
import PropTypes from 'prop-types';
import { useState } from 'react';

import { post } from '../../utils/apiHelper';
import dateDisplay from '../../utils/dateDisplay';

function OrderCardVertical({ data }) {
  const [currentData, setCurrentData] = useState(data);
  const toast = useToast();

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
        <Badge colorScheme="messenger">{`ID: ${currentData._id}`}</Badge>

        <VStack spacing={2}>
          <Badge fontSize="sm" colorScheme="orange">
            Order Details:
          </Badge>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${currentData.room.thumbnail}`}
            h="full"
            borderRadius="full"
          />
          <Text>{currentData.room.name}</Text>
          <Badge colorScheme="green">{currentData.status}</Badge>
        </VStack>

        <VStack>
          <Heading fontSize="sm">Start/End Date</Heading>
          <HStack spacing={3}>
            <Badge fontSize="sm" colorScheme="red">
              {dateDisplay(currentData.startDate)}
            </Badge>
            <Badge fontSize="sm" colorScheme="linkedin">
              {dateDisplay(currentData.endDate)}
            </Badge>
          </HStack>
        </VStack>

        <VStack spacing={3}>
          <Heading fontSize="sm">Buyer</Heading>
          <Badge colorScheme="linkedin">{`${currentData.user.firstName} ${currentData.user.lastName}`}</Badge>
          <Heading fontSize="sm">Total Price</Heading>
          <Badge colorScheme="orange">{`Rp. ${currentData.totalPrice}`}</Badge>
          <Heading fontSize="sm">Associated Employee</Heading>
          <Badge colorScheme="green">{currentData.employee === null ? 'No Employee' : 'You'}</Badge>
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

                  const apiResponse = await changeOrderStatus('ordered', currentData._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now reset!',
                      status: 'success',
                      isClosable: true,
                    });

                    return setCurrentData((prevState) => ({
                      ...prevState,
                      status: 'ordered',
                      employee: null,
                    }));
                  }

                  return toast({
                    title: 'Failed to process!',
                    description: apiResponse.response.message,
                    status: 'error',
                    isClosable: true,
                  });
                }}
              >
                Ordered
              </MenuItem>
              <MenuItem
                onClick={async (e) => {
                  e.preventDefault();

                  const apiResponse = await changeOrderStatus('processed', currentData._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now yours to manage!',
                      status: 'success',
                      isClosable: true,
                    });

                    return setCurrentData((prevState) => ({
                      ...prevState,
                      status: 'processed',
                      employee: true,
                    }));
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

                  const apiResponse = await changeOrderStatus('accepted', currentData._id);

                  if (apiResponse.status === 'success') {
                    toast({
                      title: 'Successfully updated!',
                      description: 'This order is now accepted!',
                      status: 'success',
                      isClosable: true,
                    });

                    return setCurrentData((prevState) => ({
                      ...prevState,
                      status: 'accepted',
                      employee: true,
                    }));
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
                      description: 'This order is now finished!',
                      status: 'success',
                      isClosable: true,
                    });

                    return setCurrentData((prevState) => ({
                      ...prevState,
                      status: 'finished',
                      employee: true,
                    }));
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

              const apiResponse = await changeOrderStatus('cancelled', currentData._id);

              if (apiResponse.status === 'success') {
                toast({
                  title: 'Successfully updated!',
                  description: 'This order is now cancelled!',
                  status: 'success',
                  isClosable: true,
                });

                return setCurrentData((prevState) => ({
                  ...prevState,
                  status: 'cancelled',
                  employee: true,
                }));
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
}

OrderCardVertical.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default OrderCardVertical;
