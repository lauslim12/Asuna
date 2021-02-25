import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const RoomShowCard = () => {
  return (
    <Wrap p={3} spacing={2} justify="center">
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
              Location: Floor 1
            </Badge>
          </Box>

          <Stack spacing={3}>
            <VStack spacing={3}>
              <Box>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/ganyu.png`}
                  h="full"
                  borderRadius="full"
                />
              </Box>
              <Text>Ganyu</Text>
              <Badge colorScheme="green">Office</Badge>
            </VStack>

            <ButtonGroup>
              <Button size="xs" colorScheme="green" w="100px">
                Edit Room
              </Button>
              <Button size="xs" colorScheme="red" w="100px">
                Delete Room
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default RoomShowCard;
