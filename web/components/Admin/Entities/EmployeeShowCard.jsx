import { Badge, Box, Button, Image, Stack, VStack, Wrap, WrapItem } from '@chakra-ui/react';

const EmployeeShowCard = () => {
  return (
    <Wrap p={3} spacing={5} justify="center">
      <WrapItem>
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
              Muhammad Dzulfiqar Ramadhan
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
                Joined 2020-02-25
              </Badge>
            </VStack>

            <VStack spacing={3} justify="center">
              <Badge colorScheme="red">Is an Admin</Badge>
              <Badge colorScheme="green">Is a Receptionist</Badge>
              <Badge colorScheme="yellow">Salary is Rp. 10.000.000 / month</Badge>
            </VStack>
          </Stack>

          <Stack direction={['column', 'column', 'row']} justify="center" align="center" mt={3}>
            <Button size="xs" colorScheme="green" w="100px">
              Edit Dzulfiqar
            </Button>
            <Button size="xs" colorScheme="orange" w="100px">
              Revoke Admin
            </Button>
            <Button size="xs" colorScheme="red" w="100px">
              Fire Dzulfiqar
            </Button>
          </Stack>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default EmployeeShowCard;
