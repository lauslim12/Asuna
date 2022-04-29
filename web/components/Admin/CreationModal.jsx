import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import webRoutes from '../../utils/webRoutes';

function CreationModal({ isOpen, onClose }) {
  const cancelRef = useRef();

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Check An Entity</AlertDialogHeader>
          <AlertDialogBody textAlign="center">
            Choose the entity that you want to check!
          </AlertDialogBody>
          <AlertDialogFooter>
            <VStack w="full">
              <Button ref={cancelRef} onClick={onClose} colorScheme="red" w="full">
                Cancel
              </Button>
              <Button colorScheme="green" w="full">
                <NextLink href={webRoutes.adminEntities('employees')}>Employee</NextLink>
              </Button>
              <Button colorScheme="orange" w="full">
                <NextLink href={webRoutes.adminEntities('floors')}>Floor</NextLink>
              </Button>
              <Button colorScheme="blue" w="full">
                <NextLink href={webRoutes.adminEntities('rooms')}>Rooms</NextLink>
              </Button>
            </VStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

CreationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreationModal;
