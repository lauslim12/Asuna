import {
  Badge,
  Button,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const OrderCardVertical = () => {
  return (
    <Wrap p={3} spacing={7} justify="center">
      <WrapItem>
        <Stack
          direction="column"
          bg="white"
          p={4}
          spacing={5}
          justify="center"
          borderWidth={1}
          borderColor="white"
          borderRadius="md"
          boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
        >
          <Badge colorScheme="messenger">ID: 5c8a1d5b0190b214360dc057</Badge>

          <VStack spacing={2}>
            <Badge fontSize="sm" colorScheme="orange">
              Order Details:
            </Badge>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/ganyu.png`}
              h="full"
              borderRadius="full"
            />
            <Text>Ganyu</Text>
            <Badge colorScheme="green">ORDERED</Badge>
          </VStack>

          <VStack>
            <Heading fontSize="sm">Start/End Date</Heading>
            <HStack spacing={3}>
              <Badge fontSize="sm" colorScheme="red">
                2021-02-22
              </Badge>
              <Badge fontSize="sm" colorScheme="linkedin">
                2021-02-25
              </Badge>
            </HStack>
          </VStack>

          <VStack spacing={3}>
            <Heading fontSize="sm">Buyer</Heading>
            <Badge colorScheme="linkedin">Dzulfiqar Ramadhan</Badge>
            <Heading fontSize="sm">Total Price</Heading>
            <Badge colorScheme="orange">Rp. 5.000.000</Badge>
            <Heading fontSize="sm">Associated Employee</Heading>
            <Badge colorScheme="green">Nicholas Dwiarto Wirasbawa</Badge>
          </VStack>

          <HStack>
            <Menu>
              <MenuButton as={Button} size="xs" colorScheme="green">
                Change Status
              </MenuButton>
              <MenuList>
                <MenuItem>Processed</MenuItem>
                <MenuItem>Accepted</MenuItem>
                <MenuItem>Finished</MenuItem>
              </MenuList>
            </Menu>
            <Button size="xs" colorScheme="red">
              Cancel Request
            </Button>
          </HStack>
        </Stack>
      </WrapItem>
    </Wrap>
  );
};

export default OrderCardVertical;
