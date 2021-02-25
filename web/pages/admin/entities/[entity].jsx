/* eslint-disable no-underscore-dangle */
import { Button, HStack, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import EntityTable from '../../../components/Admin/EntityTable';
import Layout from '../../../components/Layout';
import { getAuth } from '../../../helpers/apiHelper';
import webRoutes from '../../../helpers/webRoutes';

export const getServerSideProps = async (ctx) => {
  const { entity } = ctx.params;
  const token = ctx.req.cookies.jwt;
  const data = [];
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

    response.data.forEach((e) => {
      const filteredObject = {
        id: e._id,
        number: e.number,
        name: e.name,
        lastModified: new Date(e.lastModified).toISOString().split('T')[0],
        createdAt: new Date(e.createdAt).toISOString().split('T')[0],
      };

      data.push(filteredObject);
    });
  } else if (entity === 'rooms') {
    headers = ['name', 'description', 'lastModified', 'createdAt'];

    response.data.forEach((e) => {
      const filteredObject = {
        id: e._id,
        name: e.name,
        description: e.description,
        lastModified: new Date(e.lastModified).toISOString().split('T')[0],
        createdAt: new Date(e.createdAt).toISOString().split('T')[0],
      };

      data.push(filteredObject);
    });
  } else {
    headers = ['fullName', 'email', 'address', 'jobdesc', 'joinDate'];

    response.data.forEach((e) => {
      const filteredObject = {
        id: e._id,
        fullName: `${e.user.firstName} ${e.user.lastName}`,
        address: e.user.address,
        jobdesc: e.jobdesc,
        joinDate: new Date(e.joinDate).toISOString().split('T')[0],
      };

      data.push(filteredObject);
    });
  }

  return {
    props: {
      data,
      headers,
      entity,
    },
  };
};

const AdminEntities = ({ data, headers, entity }) => (
  <Layout title={['Entities']}>
    <HStack>
      <Spacer />
      <Button textTransform="capitalize" colorScheme="orange" size="sm">
        <NextLink href={webRoutes.adminCreateEntities(entity)}>{`Add New ${entity}`}</NextLink>
      </Button>
    </HStack>
    <EntityTable data={data} headers={headers} entity={entity} />
  </Layout>
);

AdminEntities.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  headers: PropTypes.arrayOf(String).isRequired,
  entity: PropTypes.string.isRequired,
};

export default AdminEntities;
