import { Button, Grid, HStack, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import EmployeeShowCard from '../../../components/Admin/Entities/EmployeeShowCard';
import FloorShowCard from '../../../components/Admin/Entities/FloorShowCard';
import RoomShowCard from '../../../components/Admin/Entities/RoomShowCard';
import Layout from '../../../components/Layout';
import { getAuth } from '../../../utils/apiHelper';
import webRoutes from '../../../utils/webRoutes';
import withAdministrator from '../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async (ctx) => {
  const token = ctx.req.cookies?.jwt;
  const { entity } = ctx.params;
  const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/${entity}`, token);

  return {
    props: {
      data: data || null,
      entity,
    },
  };
});

function AdminEntities({ data, entity }) {
  const entitiesToRender = () => {
    if (entity === 'floors') {
      return (
        <Grid p={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={10}>
          {data.map((floor) => (
            <FloorShowCard key={floor._id} data={floor} />
          ))}
        </Grid>
      );
    }

    if (entity === 'rooms') {
      return (
        <Grid p={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={3}>
          {data.map((room) => (
            <RoomShowCard key={room._id} data={room} />
          ))}
        </Grid>
      );
    }

    if (entity === 'employees') {
      return (
        <Grid p={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
          {data.map((employee) => (
            <EmployeeShowCard key={employee._id} data={employee} />
          ))}
        </Grid>
      );
    }

    return null;
  };

  return (
    <Layout title={['Entities']}>
      {data ? (
        <>
          <HStack>
            <Button textTransform="capitalize" colorScheme="purple" variant="outline" size="sm">
              <NextLink href={webRoutes.adminHomepage}>Back to Home</NextLink>
            </Button>
            <Spacer />
            <Button textTransform="capitalize" colorScheme="orange" size="sm">
              <NextLink href={webRoutes.adminCreateEntities(entity)}>
                {`Add New ${entity}`}
              </NextLink>
            </Button>
          </HStack>
          {entitiesToRender()}
        </>
      ) : (
        <Text>No such entity exist.</Text>
      )}
    </Layout>
  );
}

AdminEntities.propTypes = {
  data: PropTypes.instanceOf(Object),
  entity: PropTypes.string.isRequired,
};

AdminEntities.defaultProps = {
  data: null,
};

export default AdminEntities;
