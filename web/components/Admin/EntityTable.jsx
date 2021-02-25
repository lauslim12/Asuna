import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const EntityTable = ({ data, headers, entity }) => {
  const [currentData, setCurrentData] = useState(data);
  const [modalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const handleDelete = (id, entityData) => {
    axios
      .post('/api/delete', {
        id,
        entity: entityData,
      })
      .then(() => {
        setIsOpen(false);

        const newData = currentData.filter((el) => el.id !== id);
        setCurrentData(newData);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entity
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure to delete ${
                modalData.name || modalData.fullName
              }? You cannot undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(modalData.id, entity)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Table variant="striped" colorScheme="orange" fontSize="xs" mt={5}>
        <Thead>
          <Tr>
            {headers.map((e) => (
              <Th>{e}</Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((e) => (
            <Tr>
              {headers.map((header) => (
                <>
                  <Td>{e[header]}</Td>
                </>
              ))}
              <Td>
                <ButtonGroup spacing={3}>
                  <Tooltip label={e.id}>
                    <Button colorScheme="green" size="xs">
                      Edit
                    </Button>
                  </Tooltip>
                  <Button
                    colorScheme="red"
                    size="xs"
                    onClick={() => {
                      setModalData(e);
                      setIsOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

EntityTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  headers: PropTypes.arrayOf(String).isRequired,
  entity: PropTypes.string.isRequired,
};

export default EntityTable;
