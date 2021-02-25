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

const OrderCardHorizontal = () => {
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
          <HStack mb={3}>
            <Badge fontSize="sm" colorScheme="orange">
              Order Dates
            </Badge>

            <Spacer />

            <HStack spacing={3}>
              <Badge fontSize="sm" colorScheme="red">
                2021-02-21
              </Badge>
              <Badge fontSize="sm" colorScheme="twitter">
                2021-02-25
              </Badge>
            </HStack>
          </HStack>

          <Flex>
            <VStack>
              <Box>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/ganyu.png`}
                  h="full"
                  borderRadius="full"
                />
              </Box>
              <Text>Ganyu</Text>
              <Badge colorScheme="green">ORDERED</Badge>
            </VStack>

            <Spacer />

            <Flex fontSize="xs" direction="column">
              {/* <HStack>
                  <VStack>
                    <Heading fontSize="sm">Start</Heading>
                    <Badge colorScheme="red">2021-02-21</Badge>
                  </VStack>

                  <Spacer />

                  <VStack>
                    <Heading fontSize="sm">End</Heading>
                    <Badge colorScheme="blue">2021-02-25</Badge>
                  </VStack>
                </HStack> */}

              <VStack>
                <Heading fontSize="sm">Order ID</Heading>
                <Badge colorScheme="linkedin">5c8a1d5b0190b214360dc057</Badge>
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
            </Flex>
          </Flex>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default OrderCardHorizontal;
