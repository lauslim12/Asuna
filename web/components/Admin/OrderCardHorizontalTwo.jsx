import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const OrderCardHorizontalTwo = () => {
  return (
    <Wrap p={3} spacing={2}>
      <WrapItem>
        <VStack bg="white" p={4} spacing={5}>
          <Badge colorScheme="messenger" alignSelf="center">
            ID: 5c8a1d5b0190b214360dc057
          </Badge>
          <Flex direction="column">
            <VStack spacing={3} h="full" direction="column">
              <Badge fontSize="sm" colorScheme="orange">
                Order S/E:
              </Badge>
              <Box alignSelf="flex-start" textAlign="center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/ganyu.png`}
                  h="full"
                  borderRadius="full"
                />
                <Text>Ganyu</Text>
                <Badge colorScheme="green">ORDERED</Badge>
              </Box>
            </VStack>

            <Spacer />

            <VStack ml={5}>
              <HStack spacing={3}>
                <Badge fontSize="sm" colorScheme="red">
                  2021-02-21
                </Badge>
                <Badge fontSize="sm" colorScheme="twitter">
                  2021-02-25
                </Badge>
              </HStack>

              <Spacer />

              <VStack>
                <Heading fontSize="sm">Buyer</Heading>
                <Badge colorScheme="linkedin">Dzulfiqar Ramadhan</Badge>
              </VStack>

              <Spacer />

              <VStack>
                <Heading fontSize="sm">Total Price</Heading>
                <Badge colorScheme="orange">Rp. 5.000.000</Badge>
              </VStack>

              <Spacer />

              <VStack>
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
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </WrapItem>
    </Wrap>
  );
};

export default OrderCardHorizontalTwo;
