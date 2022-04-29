import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import { post } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';

function FloorShowCard({ data }) {
  const [currentData, setCurrentData] = useState(data);
  const [modalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();
  const bg = useColorModeValue('green.200', 'green.500');

  const handleDelete = async (id, entityData) => {
    const apiResponse = await post({ id, entity: entityData }, '/api/delete');

    if (apiResponse.status === 'success') {
      setIsOpen(false);
      setCurrentData(null);

      toast({
        title: 'Successfully deleted!',
        description: 'Floor has been deleted!',
        status: 'success',
        isClosable: true,
      });

      return true;
    }

    return toast({
      title: 'Failed to delete!',
      description: 'Floor failed to delete! Please try again!',
      status: 'error',
      isClosable: true,
    });
  };

  return currentData ? (
    <Flex>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entity
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure to delete ${modalData.name}? You cannot undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(modalData._id, 'floors')}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack bg="blue.400" p={5} borderTopLeftRadius="md" borderBottomLeftRadius="md">
        <Heading fontSize="xl">FLOOR</Heading>

        <Spacer />

        <Heading>{currentData.number}</Heading>
      </VStack>

      <VStack
        p={5}
        direction="column"
        align="center"
        bg={bg}
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        w="175px"
      >
        <Heading fontSize="md">{currentData.name}</Heading>

        <Spacer />

        <VStack>
          <Badge colorScheme="red">
            {`Since ${new Date(currentData.createdAt).toISOString().split('T')[0]}`}
          </Badge>
          <Badge colorScheme="red">
            {`Modified ${new Date(currentData.lastModified).toISOString().split('T')[0]}`}
          </Badge>
        </VStack>

        <Spacer />

        <HStack>
          <ButtonGroup>
            <Button size="xs" colorScheme="orange">
              <NextLink href={webRoutes.adminEditEntities('floors', currentData._id)}>
                Edit
              </NextLink>
            </Button>
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => {
                setModalData(data);
                setIsOpen(true);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </Flex>
  ) : null;
}

FloorShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default FloorShowCard;
