import {
  Button,
  ButtonGroup,
  HStack,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Layout from '../../../components/Layout';
import { getAuth } from '../../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const { entity } = ctx.params;
  const token = ctx.req.cookies.jwt;
  let headers = [];

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const response = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/${entity}`, token);

  if (entity === 'floors') {
    headers = ['number', 'name', 'lastModified', 'createdAt'];
  } else if (entity === 'rooms') {
    headers = ['name', 'description', 'lastModified', 'createdAt'];
  } else {
    headers = ['fullName', 'email', 'address', 'jobdesc', 'joinDate'];
  }

  return {
    props: {
      data: response.data,
      headers,
      entity,
    },
  };
};

const AdminEntities = ({ data, headers, entity }) => {
  return (
    <Layout title={['Entities']}>
      <HStack>
        <Text>Hello, Owner!</Text>
        <Spacer />
        <Button colorScheme="orange" size="md">
          Add New
        </Button>
      </HStack>
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
          {entity === 'floors' || entity === 'rooms'
            ? data.map((e) => (
                <Tr>
                  {headers.map((header) => (
                    <Td>{e[header]}</Td>
                  ))}
                  <Td>
                    <ButtonGroup spacing={3}>
                      <Tooltip label={e._id}>
                        <Button colorScheme="green" size="xs">
                          Edit
                        </Button>
                      </Tooltip>
                      <Button colorScheme="red" size="xs">
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))
            : data.map((e) => (
                <Tr>
                  <Td>{`${e.user.firstName} ${e.user.lastName}`}</Td>
                  <Td>{e.user.email}</Td>
                  <Td>{e.user.address}</Td>
                  <Td>{e.jobdesc}</Td>
                  <Td>{e.joinDate}</Td>
                  <Td>
                    <ButtonGroup spacing={3}>
                      <Tooltip label={e._id}>
                        <Button colorScheme="green" size="xs">
                          Edit
                        </Button>
                      </Tooltip>
                      <Button colorScheme="red" size="xs">
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </Layout>
  );
};

AdminEntities.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  headers: PropTypes.arrayOf(String).isRequired,
  entity: PropTypes.string.isRequired,
};

export default AdminEntities;
