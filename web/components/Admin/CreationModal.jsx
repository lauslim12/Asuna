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
import PropTypes from 'prop-types';
import { useRef } from 'react';

const CreationModal = ({ isOpen, onClose }) => {
  const cancelRef = useRef();

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Create New Entity</AlertDialogHeader>
          <AlertDialogBody>Choose the entity that you want to add!</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup spacing={4}>
              <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button colorScheme="green">Employee</Button>
              <Button colorScheme="orange">Floor</Button>
              <Button colorScheme="blue">Room</Button>
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
