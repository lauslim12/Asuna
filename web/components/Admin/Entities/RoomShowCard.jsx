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
  ButtonGroup,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import { post } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';

function RoomShowCard({ data }) {
  const [currentData, setCurrentData] = useState(data);
  const [modalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();

  const handleDelete = async (id, entityName) => {
    const apiResponse = await post({ id, entity: entityName }, '/api/delete');

    if (apiResponse.status === 'success') {
      setIsOpen(false);
      setCurrentData(null);

      toast({
        title: 'Successfully deleted!',
        description: 'Room has been deleted!',
        status: 'success',
        isClosable: true,
      });

      return true;
    }

    return toast({
      title: 'Failed to delete!',
      description: 'Room failed to delete! Please try again!',
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
              {`Are you sure to delete ${modalData.name}? You cannot undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(modalData._id, 'rooms')} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box mb={4} textAlign="center">
        <Badge fontSize="sm" colorScheme="red">
          {`Location: Floor ${currentData.floor.number}`}
        </Badge>
      </Box>

      <Stack spacing={3}>
        <VStack spacing={3}>
          <Box>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${currentData.thumbnail}`}
              h="full"
              borderRadius="full"
            />
          </Box>
          <Text>{currentData.name}</Text>
          <Badge colorScheme="green">{currentData.type}</Badge>
        </VStack>

        <VStack>
          <ButtonGroup>
            <Button size="xs" colorScheme="green" w="75px">
              <NextLink href={webRoutes.adminEditEntities('rooms', currentData._id)}>
                Edit Room
              </NextLink>
            </Button>
            <Button
              size="xs"
              colorScheme="red"
              w="75px"
              onClick={() => {
                setModalData(currentData);
                setIsOpen(true);
              }}
            >
              Delete Room
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
    </Box>
  ) : null;
}

RoomShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default RoomShowCard;
