import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Image,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import { patchAuth, post } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';

function EmployeeShowCard({ data }) {
  const [currentData, setCurrentData] = useState(data);
  const [modalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();

  const handleDelete = async (id, entityData) => {
    const apiResponse = await post({ id, entity: entityData }, '/api/delete');

    if (apiResponse.status === 'success') {
      setIsOpen(false);
      setCurrentData(null);

      toast({
        title: 'Successfully deleted!',
        description: 'Employee has been deleted!',
        status: 'success',
        isClosable: true,
      });

      return true;
    }

    return toast({
      title: 'Failed to delete!',
      description: 'Employee failed to delete! Please try again!',
      status: 'error',
      isClosable: true,
    });
  };

  const handleMakeAdmin = async (id) => {
    const authorization = await post({ key: 'make_admin_key' }, '/api/checkAuth');

    if (authorization.status === 'fail') {
      return toast({
        title: 'Failed to fetch cookie!',
        description: 'Failed to fetch cookie! Please contact your system admin.',
        status: 'error',
        isClosable: true,
      });
    }

    const apiResponse = await patchAuth(
      { id },
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/make-admin`,
      authorization.token
    );

    if (apiResponse.status === 'success') {
      setCurrentData((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          role: 'admin',
        },
      }));

      return toast({
        title: 'Successfully modified!',
        description: 'Thank you! You will be redirected shortly.',
        status: 'success',
        isClosable: true,
      });
    }

    return toast({
      title: 'Failed to make admin!',
      description: 'Employee failed to be made admin! Please try again!',
      status: 'error',
      isClosable: true,
    });
  };

  const handleRevokeAdmin = async (id) => {
    const authorization = await post({ key: 'make_admin_key' }, '/api/checkAuth');

    if (authorization.status === 'fail') {
      return toast({
        title: 'Failed to fetch cookie!',
        description: 'Failed to fetch cookie! Please contact your system admin.',
        status: 'error',
        isClosable: true,
      });
    }

    const apiResponse = await patchAuth(
      { id },
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/revoke-admin`,
      authorization.token
    );

    if (apiResponse.status === 'success') {
      setCurrentData((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          role: 'user',
        },
      }));

      return toast({
        title: 'Successfully modified!',
        description: 'Thank you! User has been made a normal user.',
        status: 'success',
        isClosable: true,
      });
    }

    return toast({
      title: 'Failed to make user!',
      description: 'Employee failed to be made user! Please try again!',
      status: 'error',
      isClosable: true,
    });
  };

  return currentData ? (
    <Box
      borderWidth={1}
      borderColor="white"
      borderRadius="md"
      p={4}
      boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
    >
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entity
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure to delete ${modalData.user?.firstName}? You cannot undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(modalData._id, 'employees')}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box mb={4} textAlign="center">
        <Badge fontSize="sm" colorScheme="red">
          {`${currentData.user.firstName} ${currentData.user.lastName}`}
        </Badge>
      </Box>

      <Stack direction={['column', 'column', 'row']} spacing={3}>
        <VStack spacing={3}>
          <Box>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/users/${currentData.user.photo}`}
              h="100px"
              w="100px"
              borderRadius="full"
            />
          </Box>
          <Badge colorScheme="blue" textAlign="center">
            {`Joined ${new Date(currentData.joinDate).toISOString().split('T')[0]}`}
          </Badge>
        </VStack>

        <VStack spacing={3} justify="center">
          {currentData.user.role === 'admin' ? (
            <Badge colorScheme="red">Is an Admin</Badge>
          ) : (
            <Badge colorScheme="twitter">Is not an Admin</Badge>
          )}
          <Badge colorScheme="green">{`Is a ${currentData.jobdesc}`}</Badge>
          <Badge colorScheme="yellow">{`Salary is Rp. ${currentData.salary} / month`}</Badge>
        </VStack>
      </Stack>

      <Stack direction={['column', 'column', 'row']} justify="center" align="center" mt={3}>
        <Button size="xs" colorScheme="green" w="100px">
          <NextLink href={webRoutes.adminEditEntities('employees', currentData._id)}>
            {`Edit ${currentData.user.firstName}`}
          </NextLink>
        </Button>
        {currentData.user.role === 'admin' ? (
          <Button
            size="xs"
            colorScheme="orange"
            w="100px"
            onClick={() => handleRevokeAdmin(currentData.user._id)}
          >
            Revoke Admin
          </Button>
        ) : (
          <Button
            size="xs"
            colorScheme="linkedin"
            w="100px"
            onClick={() => handleMakeAdmin(currentData.user._id)}
          >
            Make Admin
          </Button>
        )}
        <Button
          size="xs"
          colorScheme="red"
          w="100px"
          onClick={() => {
            setModalData(currentData);
            setIsOpen(true);
          }}
        >
          {`Fire ${currentData.user.firstName}`}
        </Button>
      </Stack>
    </Box>
  ) : null;
}

EmployeeShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default EmployeeShowCard;
