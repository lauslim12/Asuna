import { Button, Grid, HStack, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import EmployeeShowCard from '../../../components/Admin/Entities/EmployeeShowCard';
import FloorShowCard from '../../../components/Admin/Entities/FloorShowCard';
import RoomShowCard from '../../../components/Admin/Entities/RoomShowCard';
import Layout from '../../../components/Layout';
import { getAuth } from '../../../helpers/apiHelper';
import webRoutes from '../../../helpers/webRoutes';

export const getServerSideProps = async (ctx) => {
  const { entity } = ctx.params;
  const token = ctx.req.cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/${entity}`, token);

  if (!data) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
      entity,
    },
  };
};

const AdminEntities = ({ data, entity }) => (
  <Layout title={['Entities']}>
    <HStack>
      <Button textTransform="capitalize" colorScheme="purple" variant="outline" size="sm">
        <NextLink href={webRoutes.adminHomepage}>Back to Home</NextLink>
      </Button>
      <Spacer />
      <Button textTransform="capitalize" colorScheme="orange" size="sm">
        <NextLink href={webRoutes.adminCreateEntities(entity)}>{`Add New ${entity}`}</NextLink>
      </Button>
    </HStack>

    {(() => {
      if (entity === 'floors') {
        return (
          <Grid p={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={10}>
            {data.map((floor) => (
              <FloorShowCard data={floor} />
            ))}
          </Grid>
        );
      }

      if (entity === 'rooms') {
        return (
          <Grid p={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={3}>
            {data.map((room) => (
              <RoomShowCard data={room} />
            ))}
          </Grid>
        );
      }

      if (entity === 'employees') {
        return (
          <Grid p={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
            {data.map((employee) => (
              <EmployeeShowCard data={employee} />
            ))}
          </Grid>
        );
      }

      return null;
    })()}
  </Layout>
);

AdminEntities.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  entity: PropTypes.string.isRequired,
};

export default AdminEntities;
