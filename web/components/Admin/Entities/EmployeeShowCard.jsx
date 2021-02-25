import { Badge, Box, Button, Image, Stack, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const EmployeeShowCard = ({ data }) => {
  return (
    <Box
      borderWidth={1}
      borderColor="white"
      borderRadius="md"
      p={4}
      bg="white"
      boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
    >
      <Box mb={4} textAlign="center">
        <Badge fontSize="sm" colorScheme="red">
          {`${data.user.firstName} ${data.user.lastName}`}
        </Badge>
      </Box>

      <Stack direction={['column', 'column', 'row']} spacing={3}>
        <VStack spacing={3}>
          <Box>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/ganyu.png`}
              h="full"
              borderRadius="full"
            />
          </Box>
          <Badge colorScheme="blue" textAlign="center">
            {`Joined ${new Date(data.joinDate).toISOString().split('T')[0]}`}
          </Badge>
        </VStack>

        <VStack spacing={3} justify="center">
          {data.user.role === 'admin' ? (
            <Badge colorScheme="red">Is an Admin</Badge>
          ) : (
            <Badge colorScheme="twitter">Is not an Admin</Badge>
          )}
          <Badge colorScheme="green">{`Is a ${data.jobdesc}`}</Badge>
          <Badge colorScheme="yellow">{`Salary is Rp. ${data.salary} / month`}</Badge>
        </VStack>
      </Stack>

      <Stack direction={['column', 'column', 'row']} justify="center" align="center" mt={3}>
        <Button size="xs" colorScheme="green" w="100px">
          {`Edit ${data.user.firstName}`}
        </Button>
        {data.user.role === 'admin' ? (
          <Button size="xs" colorScheme="orange" w="100px">
            Revoke Admin
          </Button>
        ) : (
          <Button size="xs" colorScheme="linkedin" w="100px">
            Make Admin
          </Button>
        )}
        <Button size="xs" colorScheme="red" w="100px">
          {`Fire ${data.user.firstName}`}
        </Button>
      </Stack>
    </Box>
  );
};

EmployeeShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default EmployeeShowCard;