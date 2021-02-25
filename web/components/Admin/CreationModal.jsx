import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import webRoutes from '../../helpers/webRoutes';

const CreationModal = ({ isOpen, onClose }) => {
  const cancelRef = useRef();

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Check An Entity</AlertDialogHeader>
          <AlertDialogBody>Choose the entity that you want to check!</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup spacing={4}>
              <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button colorScheme="green">
                <NextLink href={`${webRoutes.adminEntities}/employees`}>Employee</NextLink>
              </Button>
              <Button colorScheme="orange">
                <NextLink href={`${webRoutes.adminEntities}/floors`}>Floor</NextLink>
              </Button>
              <Button colorScheme="blue">
                <NextLink href={`${webRoutes.adminEntities}/rooms`}>Rooms</NextLink>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

CreationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreationModal;
